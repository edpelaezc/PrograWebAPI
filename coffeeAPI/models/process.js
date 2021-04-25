const mongoose = require('mongoose')

const ProcessSchema = new mongoose.Schema({
    name: String,
    description: String
})

const process = mongoose.model('Process', ProcessSchema)

module.exports = process