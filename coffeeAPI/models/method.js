const mongoose = require('mongoose')

const MethodSchema = new mongoose.Schema({
    name: String,
    description: String
})

const method = mongoose.model('Method', MethodSchema)

module.exports = method