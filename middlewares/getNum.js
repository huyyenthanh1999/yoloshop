const Cart = require('../models/cartModel');
const jwt = require('jsonwebtoken')

module.exports.getCart = async (req, res, next) => {
    try {
        const user = req.user;
        if(user){
            const cartNum = await Cart.findOne({userId: user._id}).lean()
            res.locals.cartNum = {
                cartNum:cartNum
            }
        }else{
            res.locals.cartNum = 0;
        }
        next()
    } catch (error) {
        console.log(error)
        next()
    }
}