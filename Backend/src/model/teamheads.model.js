const mongoose = require('mongoose');

const teamheadsschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        trim: true,
        required: function () {
            return this.ispresident === 'no';
        }
    },
    ispresident: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
        lowercase: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const teamheadsmodule = mongoose.model('teamheads', teamheadsschema);

module.exports = teamheadsmodule;
