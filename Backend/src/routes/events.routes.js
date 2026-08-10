const express = require('express');
const multer = require('multer');
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/events.controller');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

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
