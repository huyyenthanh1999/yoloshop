const Product = require('../models/productModel')
const User = require('../models/userModel')
const Order = require('../models/orderModel')

// render dashboard
module.exports.adminDashboard = async (req, res) => {
	try {
		const productsCount = await Product.countDocuments()
		const usersCount = await User.countDocuments()

		// response
		res.render('components/admin/admin-base', {
			content: 'dashboard',
			data: {
				productsCount,
				usersCount,
				ordersCount: 20,
				salesCount: 12,
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
		const total = await Product.countDocuments()
		const products = await Product.find().populate('idProductCode')

		res.render('components/admin/admin-base', {
			content: 'products',
			data: {
				products,
				total,
			},
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
module.exports.adminCustomer = async (req, res) => {
	// try {
		const total = await User.countDocuments()
		let customers = await User.find()

		// const orders = await Order.find()

		// customers = await customers.map(async customer => {
		// 	const orders = await Order.find({userId: customer._id}).count()

		// 	customer.orders = orders
		// 	return customer
		// })

		// orders.forEach(order => {
		// 	customers = customers.map(customer => {
		// 		if(order.userId === customer._id)
		// 			customer.orders = order.length

		// 		return customer
		// 	})
		// })

		// console.log(customers)
		
		res.render('components/admin/admin-base', {
			content: 'customers',
			data: {
				customers,
				total
			},
		})
	// } catch (error) {
	// 	res.status(400).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
}


// see and edit the product
module.exports.adminEditCustomer = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)

		res.render('components/admin/admin-base', {
			content: 'edit-customer',
			data: {
				user
			}
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
	const orders = await Order.find()
	// console.log(orders)
	res.render('components/admin/admin-base', {
		content: 'orders',
		orders
	})
}

// admin render detail order page
module.exports.adminDetailOrder = async (req, res) => {
	try {
		const idOrder = req.params.id
		const order = await Order.findById(idOrder)
		res.json('hello')

	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Không tìm thấy order',
		})
	}
}