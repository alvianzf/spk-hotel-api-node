var router = require('express').Router()
var History = require('mongoose').model('History')

router.get('/', function(req, res) {
    History.find().then(function(history) {
        return res.status(200).json({status: 200, data: history});
    })
})

router.post('/', function(req, res) {
    let history = new History(req.body)

    history.save(function(err, history) {
        if (err) return res.status(422).json({status: 422, message: err.message});

        return res.status(200).json({status: 200, message: 'Created'});
    })
})

router.put('/', function(req, res) {
    History.findOneAndUpdate({_id: req.body.id}, req.body, function(err) {
        if (err) return res.status(422).json({status: 422, message: err.message});

        return res.status(200).json({status: 200, message: 'Updated'});
    })
})

router.delete('/', function(req, res) {
    History.findByIdAndDelete({_id: req.body.id}, function(err) {
        if (err) return res.status(422).json({status: 422, message: err.message});

        return res.status(200).json({status: 200, message: 'Deleted'});
    })
})

module.exports = router