const mongoose = require('mongoose')

let usermodule;
try {
    const UserSchema = new mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    })

    usermodule = mongoose.model('user', UserSchema)
} catch (error) {
    console.log('Error defining user model:', error);
}

module.exports = usermodule