const cartRouter = require('express').Router()
const cartController = require('../controllers/cartController')
const upload = require('../middlewares/uploadImgOfCart')

// cart page
cartRouter.get('/', cartController.renderCart)

// get all cart
cartRouter.get('/cartAll', cartController.getAllCart)

// get detail cart
// cartRouter.get('/:id', cartController.getDetailCart)

// create cart
cartRouter.post('/', cartController.createCart)

// update cart
cartRouter.put('/', cartController.updateCart)

// delete cart
cartRouter.delete('/', cartController.deleteCart)

// chuyen tu localStorage to cart

module.exports = cartRouter
