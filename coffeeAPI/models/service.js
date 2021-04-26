const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
})

const service = mongoose.model('Service', ServiceSchema)

module.exports = service