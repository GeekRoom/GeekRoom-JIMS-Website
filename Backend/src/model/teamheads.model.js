const mongoose = require('mongoose')

const teamheadsschema = mongoose.Schema({
    name: {
        type: String
    },
    department: {
        type: String,
        required: function () {
            return this.ispresident === 'no';
        }
    },
    ispresident: {
        type: String,
        enum: ['yes', 'no']
    },
    image: {
        type: String
    }
})

const teamheadsmodule = mongoose.model('teamheads', teamheadsschema)

module.exports = teamheadsmodule
