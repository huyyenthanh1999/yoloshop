const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const ProductCode = require('../models/productCodeModel')

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
	// try {
		const userId = req.user._id
		// console.log(userId)
		// console.log(req.body)

		// get order
		const cart = await Cart.findOne({userId})

		// console.log(cart)
		// handle totalCost
		let totalCost = 0
		for(let item of cart.products) {
			console.log(item)
			// let productCode = await ProductCode.findById()
			let product = await Product.findById(item.productId).lean()
			let productCode = await ProductCode.findById(product.idProductCode).lean()
			totalCost += productCode.cost
		}

		// phi ship
		totalCost += 30000
		// console.log(54, cart.products)

		const order = await Order.create({
			userId: userId,
			receiverName: req.body._receiverName,
			phoneNumber: req.body._phoneNumber,
			message: req.body._message,
			address: req.body._address,
			products: cart.products,
			totalCost: totalCost,
			payment: req.body._payment,
		})
		if (!order)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tạo được order',
			})

		// tru so luong san pham
		for(let product of cart.products)
		{
			const pro = await Product.findById(product.productId)
			pro.total = pro.total - product.quantity
			// await pro.update()
			await Product.updateOne({_id: pro._id}, {total: pro.total})
		}

		await cart.remove()

		res.status(200).json({
			status: 'success',
			message: 'Create new order thành công',
			order,
		})
	// } catch (error) {
	// 	res.status(500).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
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
