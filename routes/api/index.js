var router = require('express').Router()

router.use('/users', require('./users'))
router.use('/history', require('./history'))
router.use('/auth', require('./auth'))

module.exports = router