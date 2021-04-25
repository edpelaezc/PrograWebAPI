const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    userId: String,
    categoria: String,
    cantidad: Number,
    frecuencia: Number     
})

const subscription = mongoose.model('Subscription', SubscriptionSchema)

module.exports = subscription