var express = require('express');
var router = express.Router();
const quotePriceModel = require('../models/quotePrice')
const coffeeModel = require('../models/coffee')
const processModel = require('../models/process')
const SendMail = require('./mail/sendQuotePrice')
const ConfirmQuote = require('./mail/confirmQuote')


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
        SendMail(item._id, quote.correo, proceso.name, quote.cantidad, variedad.name, variedad.price, dtFecha.getTime(), dtFecha.toLocaleString('es-US'), total)

        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

router.get('/accept/:id', async function(req, res, next) {
    try {
        let cotizacion = await quotePriceModel.findById(req.params.id)
        let proceso = await processModel.findById(cotizacion.proceso)
        let cafe = await coffeeModel.findById(cotizacion.variedad)
        let total = cotizacion.cantidad * cafe.price

        cafe.qty = cafe.qty - cotizacion.cantidad
        cafe.save()    

        // send email with confirmation of coffe invoice 
        let dtFecha = new Date();
        ConfirmQuote(cotizacion.correo, total, proceso.name, cotizacion.cantidad, cafe.name, dtFecha.getTime(), dtFecha.toLocaleString('es-US'))

        res.status(200).json({ status: 200, message: 'Compra confirmada' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
})

module.exports = router;