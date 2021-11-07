const Cart = require('../models/cartModel')
const jwt = require('jsonwebtoken')

module.exports.getLog = async (req, res, next) => {
	try {
		// const user = req.user;
		// const user = 1
		// if(user){
		//     // const cartNum = await Cart.findOne({userId: user._id}).lean()

		//     res.locals.cartNum = {
		//         cartNum: 1
		//     }
		//     res.locals.logging = true;
		// }else{
		//     res.locals.cartNum = {
		//         cartNum: {
		//             products:[]
		//         }
		//     };
		//     res.locals.logging = false;
		// }
		res.locals.cartNum = {
			cartNum: {
				products: [],
			},
		}
		res.locals.logging = false
		next()
	} catch (error) {
		console.log(error)
		next()
	}
}
