var express = require('express');
var router = express.Router();
const purchaseModel = require('../models/purchase')
const serviceModel = require('../models/service')
const coffeeModel = require('../models/coffee')
const methodModel = require('../models/method')
const SendMail = require('./mail/sendPurchase')

/*
    correo: String,
    metodo: String,        
    tamaño: String,    
    variedad: String,
    total: Number
 */
// CREATE ITEM
router.post('/create', async function (req, res, next) {        
    try {
        let tamaño = await serviceModel.findById(req.body.tamaño)
        let coffeeItem = await coffeeModel.findById(req.body.variedad)
        let method = await methodModel.findById(req.body.metodo)
        let totalAmount = tamaño.price + coffeeItem.price

        let order = {
            correo: req.body.correo,
            metodo: req.body.metodo, 
            tamaño: req.body.tamaño,
            variedad: req.body.variedad,
            total: totalAmount
        }

        const item = new purchaseModel(order);
        await item.save()        

        // edit qty of coffe available
        coffeeItem.qty = coffeeItem.qty - 1;
        coffeeItem.save()

        // send the mail 
        let date = new Date();
        SendMail(order.correo, method.name, tamaño.name, totalAmount, coffeeItem.name, coffeeItem.price, tamaño.price, date.getTime(), date.toLocaleString('es-US'))

        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

module.exports = router;