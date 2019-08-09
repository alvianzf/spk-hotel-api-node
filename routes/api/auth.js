var router = require('express').Router()
var user = require('mongoose').model('Users')

router.get('/', function(req, res) {
    user.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) return res.status(422).json({status: 422, message: err.message});

        if(user)
            return res.status(200).json({status: 200, token: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)});

        return res.status(200).json({status: 200, message: 'Not authorized'})
    })
})

module.exports = router