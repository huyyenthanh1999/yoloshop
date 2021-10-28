const Order = require('../models/orderModel')

module.exports.renderOrder = (req, res) => {
	res.render('pages/checkout')
}

module.exports.detailOrder = async (req, res) => {
	try {
		const userId = req.user._id
		const order = await Order.findOne({ userId })

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

module.exports.createOrder = async (req, res) => {
	try {
		const userId = req.user._id
		console.log(userId)

		const order = await Order.create({
			userId: userId,
			receiverName: req.body._receiverName,
			phoneNumber: req.body._phoneNumber,
			message: req.body._message,
			address: req.body._address,
			products: req.body._products,
			totalCost: req.body._totalCost,
			status: req.body._status,
			payment: req.body._payment,
		})
		if (!order)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tạo được order',
			})

		res.status(200).json({
			status: 'success',
			message: 'Create new order thành công',
			order,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.create_Order = async (req, res) => {
	try {
		const userId = req.user._id

		const order = await Order.findOneAndUpdate(
			{ userId }, 
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
			message: 'Create order thành công!!!',
			order,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
