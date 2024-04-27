var express = require('express');
var router = express.Router();
var { ingestEvents, getAllEvents, unsupportedMethods } = require('./index');

// POST request to /analytics
router.post('/', ingestEvents);

// GET request to /analytics
router.get('/', getAllEvents);

// Handle unsupported methods
router.delete('/:id', unsupportedMethods);
router.put('/:id', unsupportedMethods);
router.patch('/:id', unsupportedMethods);

module.exports = router;
