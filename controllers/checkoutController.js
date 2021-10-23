const Order = require('../models/orderModel')

module.exports.renderOrder = (req, res) => {
	res.render('pages/checkout')
}

module.exports.detailOrder = async (req, res) => {
	try {
		const order = await Order.findOne({ userId: '616e853bb6f54eb7c71eb50d' })

		if (!order)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy order',
			})
		
		res.status(200).json({
			status: 'success',
			order,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// module.exports.checkOrder = async (req, res) => {
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
		if (!order) {
			const _order = await Order.findOneAndUpdate(
				{ userId: req.body._userId }, 
				{ $push: { products: { productId: req.body._productId, quantity: req.body._quantity }}},
				// { safe: true, upsert: true },
			)
			if (!_order)
				return res.status(400).json({
					status: 'fail',
					message: 'Không tìm thấy order',
				})
	
			return res.status(200).json({
				status: 'success',
				message: 'Create order thành công',
				_order,
			})
		}

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

// module.exports.updateOrder = async (req, res) => {
// 	try {
// 		const order = await Order.findOneAndUpdate(
// 			{ userId: req.body._userId, "products.productId": req.body._productId }, 
// 			{ $set: { "products.$.quantity": req.body._quantity }},
// 			// { safe: true, upsert: true },
// 		)
// 		if (!order) {
// 			return res.status(400).json({
// 				status: 'fail',
// 				message: 'Không tìm thấy order',
// 			})
// 		}

// 		res.status(200).json({
// 			status: 'success',
// 			message: 'Update order thành công',
// 			order,
// 		})
// 	} catch (error) {
// 		res.status(500).json({
// 			status: 'fail',
// 			message: 'Lỗi server',
// 		})
// 	}
// }

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
