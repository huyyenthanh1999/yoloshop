const checkoutRouter = require('express').Router()
const checkoutController = require('../controllers/checkoutController')

// order page
checkoutRouter.get('/', checkoutController.renderOrder)

// get all order
checkoutRouter.get('/checkoutAll', checkoutController.getAllOrder)

// check user
// checkoutRouter.get('/checkUser', checkoutController.checkUser)

// create order
checkoutRouter.post('/', checkoutController.createOrder)

// update order
checkoutRouter.put('/', checkoutController.updateOrder)

// delete order
checkoutRouter.delete('/', checkoutController.deleteOrder)

module.exports = checkoutRouter
