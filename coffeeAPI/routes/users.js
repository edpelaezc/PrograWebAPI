var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const confJWT = require('../conf/jwt.conf')

/* GET users listing. */
router.post('/login', async function (req, res, next) {
  var username = req.body.username
  var password = crypto.createHash('md5').update(req.body.password).digest('hex')
  var role = req.body.role

  const exists = await userModel.findOne({ username: username, password: password, role: role })

  console.log(exists);
  if (exists) {
    let token = jwt.sign({ check: true }, confJWT.key, { expiresIn: '1h' })
    res.status(200).json({ username: username, role: role, token: token })
  } else {
    res.status(401).send('Unauthorized')
  }
});

router.post('/create', async function (req, res, next) {
  try {

    const exists = await userModel.findOne({ username: req.body.username })    

    if (!exists) {
      const user = new userModel({
        username: req.body.username,
        password: crypto.createHash('md5').update(req.body.password).digest('hex'),
        role: req.body.role
      })

      await user.save()
      res.status(200).send('Successfully created')
    } else {
      res.status(409).send('A user with that username already exists')  
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).send(error)
  }
})

module.exports = router;
