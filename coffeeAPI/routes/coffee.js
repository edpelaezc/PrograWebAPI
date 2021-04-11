var express = require('express');
var router = express.Router();
const coffeeModel = require('../models/coffee')

// GET
router.get('/', async function (req, res, next) {
    console.log('return list of coffee');
    const coffees = await coffeeModel.find({});

    try {
        res.status(200).send(coffees)
    } catch (error) {
        res.status(500).send(error)
    }
});

// GET with ID
router.get('/:id', async function (req, res, next) {
    console.log('return coffee with the especified id');
    const coffee = await coffeeModel.findById(req.params.id)

    try {
        res.status(200).send(coffee)
    } catch (error) {
        res.status(500).send(error)
    }
});

// CREATE ITEM
router.post('/create', async function (req, res, next) {
    console.log('create coffee item');
    const coffee = new coffeeModel(req.body);

    try {
        await coffee.save()
        res.status(200).send('Successfully created')
    } catch (error) {
        res.status(500).send(error)
    }
});

// EDIT ITEM
router.put('/update/:id', async function (req, res, next) {
    console.log('return list of coffee');
    try {
        console.log(req.params.id);
        await coffeeModel.findByIdAndUpdate(req.params.id, req.body)        
        res.status(200).send('Successfully updated')
    } catch (error) {
        res.status(500).send(error)        
    }
});

// DELETE
router.delete('/delete/:id', async function (req, res, next) {
    console.log('return list of coffee');
    
    try {
        const coffee = await coffeeModel.findByIdAndDelete(req.params.id)

        if (!coffee) {
            res.status(404).send('Not found')            
        }

        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router;
