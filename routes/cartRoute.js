const cartRouter = require('express').Router()
const cartController = require('../controllers/cartController')
const upload = require('../middlewares/uploadImgOfCart')

// cart page
cartRouter.get('/', cartController.loadCart)

// create cart
// cartRouter.get('/create', cartController.createCart)

// get detail cart
cartRouter.get('/:id', cartController.getDetailCart)

// get all cart
cartRouter.get('/cartAll', cartController.getAllCart)

// update cart
cartRouter.put('/:id', cartController.updateCart)

// delete cart
cartRouter.delete('/:id', cartController.deleteCart)

module.exports = cartRouter
