var express = require('express');
var router = express.Router();
const quotePriceModel = require('../models/quotePrice')
const coffeeModel = require('../models/coffee')
const processModel = require('../models/process')
const SendMail = require('./mail/sendQuotePrice')


// CREATE ITEM
router.post('/create', async function (req, res, next) {    
    try {
        let proceso = await processModel.findById(req.body.proceso)
        let variedad = await coffeeModel.findById(req.body.variedad)

        let dtFecha = new Date();
        
        let quote = {
            correo: req.body.correo,
            fecha: dtFecha,
            proceso: req.body.proceso,
            cantidad: req.body.cantidad,
            variedad: req.body.variedad
        }

        let total = quote.cantidad * variedad.price

        const item = new quotePriceModel(quote);
        await item.save()        

        // send the mail 
        SendMail(quote.correo, proceso.name, quote.cantidad, variedad.name, variedad.price, dtFecha.getTime(), dtFecha.toLocaleString('es-US'), total)

        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

module.exports = router;