var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const confJWT = require('../conf/jwt.conf')

/* GET users listing. */
router.post('/login', async function(req, res, next) {
    var username = req.body.username
    var password = crypto.createHash('md5').update(req.body.password).digest('hex')

    const exists = await userModel.findOne({ username: username, password: password })

    if (exists) {
        let token = jwt.sign({ _id: exists._id }, confJWT.key, { expiresIn: '2h' })
        res.status(200).json({ _id: exists._id, username: username, role: exists.role, phone: exists.phone, address: exists.address, token: token })
    } else {
        res.status(401).json({ status: 401, message: 'Unauthorized' })
    }
});

router.post('/create', async function(req, res, next) {
    try {

        const exists = await userModel.findOne({ username: req.body.username })

        if (!exists) {
            const user = new userModel({
                username: req.body.username,
                address: req.body.address,
                phone: req.body.phone,
                password: crypto.createHash('md5').update(req.body.password).digest('hex'),
                role: req.body.role
            })

            await user.save()
            res.status(200).json({ status: 200, message: 'Successfully created' })
        } else {
            res.status(202).json({ status: 202, message: 'A user with that username already exists' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: error })
    }
})

module.exports = router;