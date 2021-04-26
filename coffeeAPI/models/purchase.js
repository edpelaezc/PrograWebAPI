const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
    correo: String,
    metodo: String,
    tamaño: String,
    total: Number,
    variedad: String
})

const purchase = mongoose.model('Purchase', PurchaseSchema)

module.exports = purchase