var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const db = 'CoffeMongoDB'
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// defining the interface for object
let coffeeList = [];
coffeeList.push(
    {
        id: 1,
        name: 'bourbon',
        qty: 100,
        measure: 'lb',
        process: 'Natural'
    },
    {
        id: 2,
        name: 'pacamara',
        qty: 20,
        measure: 'lb',
        process: 'Honey'
    },
    {
        id: 3,
        name: 'caturra',
        qty: 50,
        measure: 'kg',
        process: 'Natural'
    }
);

// GET
router.get('/', function (req, res, next) {
    connect()
    console.log('return list of coffee');
    res.status(200).send(coffeeList);
});

function connect() {
    client.connect(err => {
        console.log('conected ' + process.env.DB_NAME);        
        // perform actions on the collection object
        client.close();
    })
}

// GET with ID
router.get('/:id', function (req, res, next) {
    console.log('return coffee with the especified id');
    let response = null;
    coffeeList.forEach(item => {
        if (item.id == req.params.id) {
            response = item;
        }
    });

    response == null ? res.status(404).send('NOT FOUND') : res.status(200).send(response);
});

// CREATE ITEM
router.post('/create', function (req, res, next) {
    console.log('create coffee item');
    try {
        coffeeList.push(
            {
                id: coffeeList.length + 1,
                name: req.body.name,
                qty: req.body.qty,
                measure: req.body.measure,
                process: req.body.process
            });

        console.log(coffeeList);
        res.status(201).send('Successfully created');
    } catch (error) {
        res.status(400).send('Bad request');
    }
});

// EDIT ITEM
router.put('/update/:id', function (req, res, next) {
    console.log('return list of coffee');
    let element = {
        id: parseInt(req.params.id),
        name: req.body.name,
        qty: req.body.qty,
        measure: req.body.measure,
        process: req.body.process
    }

    updateList(element, function (success) {
        if (success) {
            res.status(204).send('Successfully updated');
        } else {
            res.status(404).send('NOT FOUND');
        }
    });
});

// DELETE
router.delete('/delete/:id', function (req, res, next) {
    console.log('return list of coffee');

    exists(parseInt(req.params.id), function (elementExists) {
        if (elementExists) {
            coffeeList.splice(parseInt(req.params.id) - 1, 1);
            res.status(204).send('Deleted item');
        } else {
            res.status(404).send('NOT FOUND');
        }
    });
});


function updateList(element, callback) {
    let flag = false;
    coffeeList.forEach(function (item, index) {
        if (item.id == element.id) {
            this[index] = element;
            flag = true;
        }
    }, coffeeList);

    callback(flag);
    return;
}

function exists(id, callback) {
    let flag = false;
    coffeeList.forEach(item => {
        if (item.id == id) {
            flag = true;
        }
    });

    callback(flag);
    return;
}


module.exports = router;
