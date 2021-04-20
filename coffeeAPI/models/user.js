const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String, 
    password: String, 
    role: String,            
})

const user = mongoose.model('User', UserSchema)

module.exports = user