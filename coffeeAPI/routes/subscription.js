var express = require('express');
var router = express.Router();
const model = require('../models/subscription')


// GET with ID
router.get('/:id', async function (req, res, next) {
    console.log('return coffee with the especified id');
    const coffee = await model.find({ userId: req.params.id })

    try {
        res.status(200).send(coffee)
    } catch (error) {
        res.status(500).json({status: 500, message: error })
    }
});

// CREATE ITEM
router.post('/create', async function (req, res, next) {
    console.log('create subscription item');
    const subscription = new model(req.body);

    try {
        await subscription.save()
        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json(error)
    }
});

// EDIT ITEM
router.put('/update/:id', async function (req, res, next) {
    try {
        await model.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ status: 200, message: 'Succesfully updated' })
    } catch (error) {
        res.status(500).json(error)
    }
});

// DELETE
router.delete('/delete/:id', async function (req, res, next) {
    try {
        const subscription = await model.findByIdAndDelete(req.params.id)

        if (!subscription) {
            res.status(404).json({ status: 404, message: 'Not found' })
        }

        res.status(200).json({ status: 200, message: 'Deleted' })
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;
