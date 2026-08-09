const mongoose = require('mongoose')


let acheivementmodule;
try {
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
        }


    })

    acheivementmodule = mongoose.model('acheivement', acheivementschema)
} catch (error) {
    console.log('Error defining acheivement model:', error);
}

module.exports = acheivementmodule