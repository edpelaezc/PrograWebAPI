const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
    correo: String,
    metodo: String,        
    tamaño: String,    
    variedad: String,
    total: Number
})

const purchase = mongoose.model('Purchase', PurchaseSchema)

module.exports = purchase