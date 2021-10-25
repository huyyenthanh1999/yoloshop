const cartRouter = require('express').Router()
const cartController = require('../controllers/cartController')

// cart page
cartRouter.get('/', cartController.renderCart)

// get detail cart
cartRouter.put('/detailCart', cartController.detailCart)

// create cart
cartRouter.post('/', cartController.createCart)
// cartRouter.put('/create', cartController.create_Cart)

// update cart
cartRouter.put('/', cartController.updateCart)

// delete cart
cartRouter.delete('/', cartController.deleteCart)

// chuyen tu localStorage to cart

module.exports = cartRouter
