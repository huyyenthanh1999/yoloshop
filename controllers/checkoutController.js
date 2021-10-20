const Order = require('../models/OrderModel')

module.exports.renderOrder = (req, res) => {
	// console.log(req.query.q)
	res.render('pages/checkout')
}

module.exports.getAllOrder = async (req, res) => {
	try {
		const orders = await Order.find({})

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

module.exports.updateOrder = async (req, res) => {
	try {
		const order = await Order.findOneAndUpdate({ products.productId: req.body._productId }, { quantity: req.body._quantity })
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
