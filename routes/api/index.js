var router = require('express').Router()

router.use('/users', require('./users'))
router.use('/history', require('./history'))
router.use('/auth', require('./auth'))
router.use('/topsis', require('./topsis'))
router.use('/hotel', require('./hotels'))

module.exports = router