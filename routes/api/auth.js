var router = require('express').Router()
var user = require('mongoose').model('Users')

router.get('/', function(req, res) {
    user.findOne({email: req.body.name, password: req.body.password}, function(err, user) {
        if (err) return res.status(422).json({status: 422, message: err.message});

        return res.status(200).json({status: 200, token: Date()});
    })
})

module.exports = router