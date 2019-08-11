var router = require('express').Router()
var hotel = require('../../hotels/choices')

router.get('/', function(req, res) {
    return res.status(200).json(hotel);
})

module.exports = router