const Cart = require('../models/cartModel');
const jwt = require('jsonwebtoken')

module.exports.getCart = async (req, res, next) => {
    try {
        var decoded = jwt.verify(req.cookies.tokenId, process.env.TOKEN_KEY);
        const userId = decoded.userId;
        const cartNum = await Cart.findOne({userId: userId}).lean()
        res.locals.cartNum = cartNum;
        next()
    } catch (error) {
        console.log(error)
        next()
    }
}