var express = require('express');
var router = express.Router();
const serviceModel = require('../models/service')

// GET
router.get('/', async function (req, res, next) {
    const item = await serviceModel.find({});

    try {
        res.status(200).send(item)
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// GET with ID
router.get('/list', async function (req, res, next) {
    const item = await serviceModel.find({}, '-description -__v -price')

    try {
        res.status(200).send(item)
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// CREATE ITEM
router.post('/create', async function (req, res, next) {
    const item = new serviceModel(req.body);

    try {
        await item.save()
        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// EDIT ITEM
router.put('/update/:id', async function (req, res, next) {
    try {
        await serviceModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ status: 200, message: 'Succesfully updated' })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// DELETE
router.delete('/delete/:id', async function (req, res, next) {
    try {
        const item = await serviceModel.findByIdAndDelete(req.params.id)

        if (!item) {
            res.status(404).json({ status: 404, message: 'Not found' })
        }

        res.status(200).json({ status: 200, message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

module.exports = router;