const checkoutRouter = require('express').Router()
const checkoutController = require('../controllers/checkoutController')

// order page
checkoutRouter.get('/', checkoutController.renderOrder)

// get detail order
checkoutRouter.get('/detailOrder', checkoutController.detailOrder)

// check order
// checkoutRouter.get('/checkOrder', checkoutController.checkOrder)

// create order
checkoutRouter.post('/', checkoutController.createOrder)

// update order
checkoutRouter.put('/', checkoutController.updateOrder)

// delete order
checkoutRouter.delete('/', checkoutController.deleteOrder)

module.exports = checkoutRouter
