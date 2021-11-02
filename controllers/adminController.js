const Product = require('../models/productModel')
const ProductCode = require('../models/productCodeModel')
const User = require('../models/userModel')
const Order = require('../models/orderModel')
const News = require('../models/newsModel')

// render dashboard
module.exports.adminDashboard = async (req, res) => {
	try {
		const productsCount = await Product.countDocuments()
		const usersCount = await User.countDocuments()

		const ordersCount = await Order.countDocuments()

		const newsCount = await News.countDocuments()

		// response
		res.render('components/admin/admin-base', {
			content: 'dashboard',
			data: {
				productsCount,
				usersCount,
				ordersCount,
				newsCount,
			},
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// render products
module.exports.adminProducts = async (req, res) => {
	try {
		res.render('components/admin/admin-base', {
			content: 'products',
			data: {},
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// see and edit the product
module.exports.adminEditProduct = async (req, res) => {
	res.render('components/admin/admin-base', {
		content: 'edit-product',
	})
}

// render add product page
module.exports.adminAddProduct = (req, res) => {
	res.render('components/admin/admin-base', {
		content: 'add-product',
	})
}

// render customers admin page
module.exports.adminCustomers = async (req, res) => {
	res.render('components/admin/admin-base', {
		content: 'customers',
		data: {},
	})
}

// see and edit the product
module.exports.adminEditCustomer = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)

		res.render('components/admin/admin-base', {
			content: 'edit-customer',
			data: {
				user,
			},
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// admin render order page
module.exports.adminOrder = async (req, res) => {
	// const orders = await Order.find()
	// console.log(orders)
	res.render('components/admin/admin-base', {
		content: 'orders',
		data: {
			// orders
		},
	})
}

// admin render order detail page
module.exports.adminDetailOrder = async (req, res) => {
	const idOrder = req.params.id
	const order = await Order.findById(idOrder).lean()

	// find người đặt
	const user = await User.findById(order.userId).lean()
	order.user = user

	// find products
	const products = []
	for (let item of order.products) {
		let product = await Product.findById(item.productId, {
			color: 1,
			size: 1,
			_id: 0,
			idProductCode: 1,
		}).lean()
		let productCode = await ProductCode.findById(product.idProductCode, {
			description: 0,
		}).lean()
		products.push({ ...product, ...productCode, quantity: item.quantity })
	}

	// console.log(products)
	order.products = products
	// console.log(order)

	// get order, thông tin người đặt và người nhận
	res.render('components/admin/admin-base', {
		content: 'detail-order',
		order: order,
	})
}

// admin account render
module.exports.adminAccount = async (req, res) => {
	try {
		// const user = await User.findById(req.params.id)
		// const user = await User.find

		res.render('components/admin/admin-base', {
			content: 'edit-customer',
			data: {
				user: req.user,
			},
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
