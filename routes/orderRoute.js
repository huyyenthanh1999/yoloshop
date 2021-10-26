const router = require('express').Router()
const controller = require('../controllers/orderController')

// get all orders
router.get('/api', controller.getAllOrders)


module.exports = router