const mongoose = require('mongoose')

const CoffeeSchema = new mongoose.Schema({
    name: String, 
    qty: Number
})

const coffee = mongoose.model('Coffee', CoffeeSchema)

module.exports = coffee