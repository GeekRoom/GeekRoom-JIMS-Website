const express = require('express');
const upload = require('../middleware/upload.middleware');
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/events.controller');

const router = express.Router();

const uploadEventImages = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image_gallery', maxCount: 10 },
    { name: 'image_gallery[]', maxCount: 10 }
]);

router.post('/create_event', uploadEventImages, createEvent);
router.get('/get_events', getAllEvents);
router.get('/get_event/:id', getEventById);
router.put('/update_event/:id', uploadEventImages, updateEvent);
router.delete('/delete_event/:id', deleteEvent);

module.exports = router;
