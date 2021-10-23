const checkoutRouter = require('express').Router()
const checkoutController = require('../controllers/checkoutController')

// order page
checkoutRouter.get('/', checkoutController.renderOrder)

// get detail order
checkoutRouter.get('/detailOrder', checkoutController.detailOrder)

// create order
checkoutRouter.post('/', checkoutController.createOrder)
checkoutRouter.put('/abc', checkoutController.create_Order)

// update order
checkoutRouter.put('/', checkoutController.updateOrder)

// delete order
checkoutRouter.delete('/', checkoutController.deleteOrder)

module.exports = checkoutRouter
