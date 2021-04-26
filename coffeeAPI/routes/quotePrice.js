var express = require('express');
var router = express.Router();
const quotePriceModel = require('../models/quotePrice')


// CREATE ITEM
router.post('/create', async function (req, res, next) {    
    const item = new quotePriceModel(req.body);

    try {
        await item.save()        
        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

module.exports = router;