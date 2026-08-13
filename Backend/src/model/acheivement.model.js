const mongoose = require('mongoose')


const acheivementschema = mongoose.Schema({
    month: {
        type: Date
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tagname: {
        type: String
    },
    winnerName: {
        type: String
    }

}, { timestamps: true });

const acheivementmodule = mongoose.model('acheivement', acheivementschema)

module.exports = acheivementmodule
