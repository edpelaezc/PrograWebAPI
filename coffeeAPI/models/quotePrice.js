const mongoose = require('mongoose')

const QuotePriceSchema = new mongoose.Schema({    
    correo: String,
    fecha: Date,
    proceso: String,
    cantidad: Number,
    variedad: String
})

const quotePrice = mongoose.model('QuotePrice', QuotePriceSchema)

module.exports = quotePrice