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
            res.locals.cartNum = {
                cartNum: {
                    products:[]
                }
            };
        }
        next()
    } catch (error) {
        console.log(error)
        next()
    }
}