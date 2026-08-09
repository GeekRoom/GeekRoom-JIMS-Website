const mongoose = require('mongoose')

let teamheadsmodule;
try {
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

    teamheadsmodule = mongoose.model('teamheads', teamheadsschema)
} catch (error) {
    console.log('Error defining teamheads model:', error);
}

module.exports = teamheadsmodule
