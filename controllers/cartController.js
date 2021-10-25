const Cart = require('../models/cartModel')

module.exports.renderCart = (req, res) => {
	res.render('pages/cart')
}

module.exports.detailCart = async (req, res) => {
	try {
		console.log(req.body)
		const cart = await Cart.findOne({ userId: req.body._userId }) // req.body._userId '616e853bb6f54eb7c71eb50d'

		if (!cart)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy cart',
			})
		
		res.status(200).json({
			status: 'success',
			cart,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.createCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.body.userId }) // req.body._userId '616e853bb6f54eb7c71eb50d'
		if (!cart) {
			const cart = await Cart.create({
				userId: req.body.userId,
				products: req.body.products,
			})
			if (!cart)
				return res.status(400).json({
					status: 'fail',
					message: 'Không tạo được cart',
				})
		}

		const _cart = await Cart.findOne(
			{ $and: [{userId: req.body._userId}, {'products.productId': req.body._productId} ]}, 
			// { $set: { 'products.$.quantity': req.body._quantity }},
			// { safe: true, upsert: true },
		)
		if (_cart) {
			console.log('test')
			const cart_ = await Cart.findOneAndUpdate(
				{ userId: req.body.userId }, 
				{ $push: { products: { productId: req.body._productId, quantity: req.body._quantity }}},
				// { safe: true, upsert: true },
			)
			// if (!cart_)
			// 	return res.status(400).json({
			// 		status: 'fail',
			// 		message: 'Không tìm thấy cart',
			// 	})
		} else {
			console.log('abc');
			const cart_ = await Cart.findOneAndUpdate(
				{ userId: req.body.userId, 'products.productId': req.body._productId }, 
				{ $set: { 'products.$.quantity': req.body._sl }},
				// { safe: true, upsert: true },
			)
			// if (!cart_)
			// 	return res.status(400).json({
			// 		status: 'fail',
			// 		message: 'Không tìm thấy cart',
			// 	})
		}

		res.status(200).json({
			status: 'success',
			message: 'Create cart thành công',
			cart,
		})

	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// module.exports.createCart = async (req, res) => {
// 	try {
// 		const cart = await Cart.create({
// 			userId: req.body.userId,
// 			products: req.body.products,
// 		})
// 		if (!cart)
// 			return res.status(400).json({
// 				status: 'fail',
// 				message: 'Không tạo được cart',
// 			})

// 		res.status(200).json({
// 			status: 'success',
// 			message: 'Create new cart thành công',
// 			cart,
// 		})
// 	} catch (error) {
// 		res.status(500).json({
// 			status: 'fail',
// 			message: 'Lỗi server',
// 		})
// 	}
// }

// module.exports.create_Cart = async (req, res) => {
// 	try {
// 		const cart = await Cart.findOneAndUpdate(
// 			{ userId: req.body._userId }, 
// 			{ $push: { products: { productId: req.body._productId, quantity: req.body._quantity }}},
// 			// { safe: true, upsert: true },
// 		)
// 		if (!cart)
// 			return res.status(400).json({
// 				status: 'fail',
// 				message: 'Không tìm thấy cart',
// 			})

// 		res.status(200).json({
// 			status: 'success',
// 			message: 'Create cart thành công',
// 			cart,
// 		})
// 	} catch (error) {
// 		res.status(500).json({
// 			status: 'fail',
// 			message: 'Lỗi server',
// 		})
// 	}
// }

module.exports.updateCart = async (req, res) => {
  	try {
		const cart = await Cart.findOneAndUpdate(
			{ userId: req.body._userId, 'products.productId': req.body._productId }, 
			{ $set: { 'products.$.quantity': req.body._quantity }},
			// { safe: true, upsert: true },
		)
		if (!cart)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy cart',
			})

		res.status(200).json({
			status: 'success',
			message: 'Update cart thành công',
			cart,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.deleteCart = async (req, res) => {
	try {
		const cart = await Cart.findOneAndUpdate(
			{ userId: req.body._userId }, 
			{ $pull: { products: { productId: req.body._productId }}},
			// { safe: true, upsert: true },
		)
		if (!cart)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy cart',
			})

		res.status(200).json({
			status: 'success',
			message: 'Delete cart thành công',
			cart,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
