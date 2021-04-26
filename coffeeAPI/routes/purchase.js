var express = require('express');
var router = express.Router();
const purchaseModel = require('../models/purchase')

/*
    correo: String,
    metodo: String,
    tamaño: String,
    total: Number,
    variedad: String
 */
// CREATE ITEM
router.post('/create', async function (req, res, next) {        
    try {
        let order = {
            correo: req.body.correo,
            metodo: req.body, 
        }
        const item = new purchaseModel(req.body);
        await item.save()        
        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

module.exports = router;