var express = require('express');
var router = express.Router();
const coffeeModel = require('../models/coffee')

// GET
router.get('/', async function (req, res, next) {    
    const coffees = await coffeeModel.find({});

    try {
        res.status(200).send(coffees)
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// GET with ID
router.get('/list', async function (req, res, next) {
    const item = await coffeeModel.find({ qty: { $gte: 10 } }, '-qty -__v -price')

    try {
        res.status(200).send(item)
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// CREATE ITEM
router.post('/create', async function (req, res, next) {
    console.log('create coffee item');
    const coffee = new coffeeModel(req.body);

    try {
        await coffee.save()
        res.status(200).json({ status: 200, message: 'Succesfully created' })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// EDIT ITEM
router.put('/update/:id', async function (req, res, next) {
    console.log('return list of coffee');
    try {
        console.log(req.params.id);
        await coffeeModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ status: 200, message: 'Succesfully updated' })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

// DELETE
router.delete('/delete/:id', async function (req, res, next) {
    console.log('return list of coffee');

    try {
        const coffee = await coffeeModel.findByIdAndDelete(req.params.id)

        if (!coffee) {
            res.status(404).json({ status: 404, message: 'Not found' })
        }

        res.status(200).json({ status: 200, message: 'Deleted' })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
});

module.exports = router;
