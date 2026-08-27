const Event = require('../model/event.model');
const uploadToImageKit = require('../utils/imagekit');

const getEventData = async (req) => {
    try {
        const eventData = { ...req.body };

        if (eventData.registration_link && !eventData.link) {
            eventData.link = eventData.registration_link;
        }

        delete eventData.registration_link;

        if (req.files?.image?.[0]) {
            eventData.image = await uploadToImageKit(req.files.image[0], '/events/covers');
        } else if (req.body.remove_cover_image === 'true') {
            eventData.image = '';
        }
        delete eventData.remove_cover_image;

        if (req.body.existing_gallery) {
            try {
                eventData.image_gallery = JSON.parse(req.body.existing_gallery);
            } catch (e) {
                // Ignore parse errors
            }
            delete eventData.existing_gallery;
        }

        const galleryFiles = [
            ...(req.files?.image_gallery || []),
            ...(req.files?.['image_gallery[]'] || [])
        ];

        if (galleryFiles.length > 0) {
            const newUrls = await Promise.all(
                galleryFiles.map((file) => uploadToImageKit(file, '/events/gallery'))
            );
            eventData.image_gallery = [...(eventData.image_gallery || []), ...newUrls];
        }

        return eventData;
    } catch (error) {
        throw new Error(`Event image upload failed: ${error.message}`);
    }
};

const formatEventResponse = (event) => {
    try {
        const eventData = event.toObject ? event.toObject() : event;
        const hasDeadlinePassed = eventData.registration_deadline
            ? new Date() > new Date(eventData.registration_deadline)
            : false;

        if (eventData.date) {
            const eventDate = new Date(eventData.date);
            eventDate.setHours(0, 0, 0, 0);
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (eventDate < today) {
                eventData.status = 'past';
            }
        }

        return {
            ...eventData,
            is_registration_open: Boolean(eventData.link && eventData.link !== '#') && !hasDeadlinePassed,
            link: hasDeadlinePassed ? null : eventData.link
        };
    } catch (error) {
        throw new Error(`Event response formatting failed: ${error.message}`);
    }
};

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(await getEventData(req));

        return res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: formatEventResponse(event)
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: -1 });

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events.map(formatEventResponse)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: formatEventResponse(event)
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, await getEventData(req), {
            new: true,
            runValidators: true
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: formatEventResponse(event)
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
