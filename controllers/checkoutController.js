const Order = require('../models/OrderModel')

module.exports.renderOrder = (req, res) => {
	res.render('pages/checkout')
}

module.exports.getAllOrder = async (req, res) => {
	try {
		const orders = await Order.find({ userId: "616ec5c29fc5df4a3413073d" })

		res.status(200).json({
			status: 'success',
			orders,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// module.exports.checkUser = async (req, res) => {
// 	try {
// 		const order = await Order.findOne(
// 			{ userId: req.body._userId }, 
// 			{ $push: { products: { productId: req.body._productId }}},
// 			{ safe: true, upsert: true },
// 		)
// 		if (!order)
// 			return res.status(400).json({
// 				status: 'fail',
// 				message: 'Không tìm thấy order',
// 		})

// 		res.status(200).json({
// 			status: 'success',
// 			message: 'Find order thành công',
// 			order,
// 		})
// 	} catch (error) {
// 		res.status(500).json({
// 			status: 'fail',
// 			message: 'Lỗi server',
// 		})
// 	}
// }

module.exports.createOrder = async (req, res) => {
	try {
		const order = await Order.findOneAndUpdate(
			{ userId: req.body._userId }, 
			{ $push: { products: { productId: req.body._productId, quantity: req.body._quantity }}},
			// { safe: true, upsert: true },
		)
		if (!order)
		return res.status(400).json({
			status: 'fail',
			message: 'Không tìm thấy order',
		})

		res.status(200).json({
			status: 'success',
			message: 'Create order thành công',
			order,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.updateOrder = async (req, res) => {
	try {
		const order = await Order.findOneAndUpdate(
			{ userId: req.body._userId, "products.productId": req.body._productId }, 
			{ $set: { "products.$.quantity": req.body._quantity }},
			// { safe: true, upsert: true },
		)
		if (!order)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy order',
		})

		res.status(200).json({
			status: 'success',
			message: 'Update order thành công',
			order,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.deleteOrder = async (req, res) => {
	try {
		const order = await Order.findOneAndUpdate(
			{ userId: req.body._userId }, 
			{ $pull: { products: { productId: req.body._productId }}},
			{ safe: true, upsert: true },
		)
		if (!order)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy order',
		})

		res.status(200).json({
			status: 'success',
			message: 'Delete order thành công',
			order,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
