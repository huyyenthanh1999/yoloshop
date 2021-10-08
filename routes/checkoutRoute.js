const checkoutRouter = require('express').Router()
const checkoutController = require('../controllers/checkoutController')
const upload = require('../middlewares/uploadImgOfCart')

// cart page
checkoutRouter.get('/', checkoutController.renderCheckout)

// create cart
// checkoutRouter.get('/create', cartController.createCart)

// // get detail cart
// checkoutRouter.get('/:id', cartController.getDetailCart)

// // get all cart
// checkoutRouter.get('/cartAll', cartController.getAllCart)

// // update cart
// checkoutRouter.put('/:id', cartController.updateCart)

// // delete cart
// checkoutRouter.delete('/:id', cartController.deleteCart)

module.exports = checkoutRouter
