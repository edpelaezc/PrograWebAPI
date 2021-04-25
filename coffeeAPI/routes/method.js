var express = require('express');
var router = express.Router();
const methodModel = require('../models/method')

// GET
router.get('/', async function (req, res, next) {    
    const item = await methodModel.find({});

    try {
        res.status(200).send(item)
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

// GET with ID
router.get('/:id', async function (req, res, next) {    
    const item = await methodModel.findById(req.params.id)

    try {
        res.status(200).send(item)
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

// CREATE ITEM
router.post('/create', async function (req, res, next) {    
    const item = new methodModel(req.body);

    try {
        await item.save()        
        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

// EDIT ITEM
router.put('/update/:id', async function (req, res, next) {    
    try {        
        await methodModel.findByIdAndUpdate(req.params.id, req.body)                
        res.status(200).json({ status: 200, message: 'Succesfully updated' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})    
    }
});

// DELETE
router.delete('/delete/:id', async function (req, res, next) {        
    try {
        const item = await methodModel.findByIdAndDelete(req.params.id)

        if (!item) {            
            res.status(404).json({ status: 404, message: 'Not found' })
        }
        
        res.status(200).json({ status: 200, message: 'Deleted' })
    } catch (error) {
        res.status(500).json({status: 500, message: error})
    }
});

module.exports = router;