const mongoose = require('mongoose')


const eventschema = mongoose.Schema({
    image: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: Date
    },

    title: {
        type: Date
    },
    date: {
        type: Date
    },
    venue: {
        type: String
    },
    format: {
        type: String,
        enum: ['online', 'offline']
    },
    image_gallery: {
        type: [String],
        default: []
    }


})

const eventmodule = mongoose.model('event', eventschema)

module.exports = eventmodule