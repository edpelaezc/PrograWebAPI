const mongoose = require('mongoose')

const QuotePriceSchema = new mongoose.Schema({
    factura: Number,
    fecha: Date,
    proceso: String,
    cantidad: Number,
    variedad: String
})

const quotePrice = mongoose.model('QuotePrice', QuotePriceSchema)

module.exports = quotePrice