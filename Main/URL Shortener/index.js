function getStatForRequests(m, database, requests) {
    const userURLMap = new Map();
    for (let i = 0; i < database.length; i++) {
        const [userIdStr, shortURL, actualURL] = database[i].split(' ');
        const userId = parseInt(userIdStr);
        if (userId >= 0 && userId < m) {
            userURLMap.set(shortURL, { userId, actualURL });
        }
    }

    const userRequestCounts = new Array(m).fill(0);
    const results = [];

    for (let i = 0; i < requests.length; i++) {
        if (userURLMap.has(requests[i])) {
            const { userId, actualURL } = userURLMap.get(requests[i]);
            const count = ++userRequestCounts[userId];
            results.push([actualURL, count]);
        } else {
            results.push(['URL not found', -1]);
        }
    }
    return results;
}
