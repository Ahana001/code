import { Op } from '@sequelize/core';

async function ingestEvents(req, res) {
    const events = req.body;
    let ingestedCount = 0;

    for (const event of events) {
        const { user, eventType } = event;

        // Check if the same event type for the same user exists within the time window
        const existingEvent = await Analytics.findOne({
            where: {
                user,
                eventType,
                date: {
                    [Op.gte]: subtractSecondsFromCurrentTime(eventType === 'click' ? 3 : 5)
                }
            }
        });

        // If no existing event found, save the event
        if (!existingEvent) {
            await Analytics.create({
                eventType,
                user,
                date: new Date()
            });
            ingestedCount++;
        }
    }

    res.status(201).json({ ingested: ingestedCount });
}

async function getAllEvents(req, res) {
    try {
        // Retrieve all events from the database
        const allEvents = await Analytics.findAll();
        res.status(200).json(allEvents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

function unsupportedMethods(req, res) {
    // Respond with 405 Method Not Allowed for unsupported methods
    res.status(405).send('Method Not Allowed');
}

module.exports = {
    ingestEvents,
    getAllEvents,
    unsupportedMethods
};
