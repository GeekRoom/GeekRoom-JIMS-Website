const mongoose = require('mongoose');

const eventschema = mongoose.Schema({
    image: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Date
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        trim: true
    },
    tagline: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    },
    accent: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['upcoming', 'past'],
        default: 'past',
        lowercase: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true,
        trim: true
    },
    team_members: {
        type: String,
        trim: true
    },
    format: {
        type: String,
        enum: ['online', 'offline', 'hybrid'],
        lowercase: true,
        trim: true
    },
    image_gallery: {
        type: [String],
        default: []
    },
    link: {
        type: String,
        default: '#',
        trim: true
    },
    registration_deadline: {
        type: Date
    }
}, { timestamps: true });

const eventmodule = mongoose.model('event', eventschema);

module.exports = eventmodule;
