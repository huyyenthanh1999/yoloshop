const checkoutRouter = require('express').Router()
const checkoutController = require('../controllers/checkoutController')

// order page
checkoutRouter.get('/', checkoutController.renderOrder)

// get all order
checkoutRouter.get('/checkoutAll', checkoutController.getAllOrder)

// update order
checkoutRouter.put('/', checkoutController.updateOrder)

module.exports = checkoutRouter
