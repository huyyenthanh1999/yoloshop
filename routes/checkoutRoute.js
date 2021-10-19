const checkoutRouter = require('express').Router()
const checkoutController = require('../controllers/checkoutController')

// cart page
checkoutRouter.get('/', checkoutController.renderCheckout)

checkoutRouter.post('/', checkoutController.goToCheckout)

module.exports = checkoutRouter
