const mongoose = require('mongoose')


let eventmodule;
try {
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

    eventmodule = mongoose.model('event', eventschema)
} catch (error) {
    console.log('Error defining event model:', error);
}

module.exports = eventmodule