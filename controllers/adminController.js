const Product = require('../models/productModel')
const ProductCode = require('../models/productCodeModel')
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
		// // tổng tất cả sản phẩm
		// let totalProducts = 0
		// // const products = await Product.find().populate('idProductCode')

		// const productCodes = await ProductCode.find().lean()

		// // đếm số lượng sản phẩm trong productCodes
		// for(let item of productCodes){
		// 	const products = await Product.find(
		// 		{ idProductCode: item._id },
		// 		{ total: 1, color: 1, size: 1 }
		// 	).lean()
		// 	// console.log(products)
		// 	let totalProductsOfCode = 0
		// 	products.forEach((item) => {
		// 		totalProductsOfCode += item.total
		// 	})

		// 	item.total = totalProductsOfCode
		// 	item.products = products
		// 	// console.log(item)
		// 	totalProducts += totalProductsOfCode
		// }

		// // console.log(productCodes)
		// // console.log(totalProducts)

		res.render('components/admin/admin-base', {
			content: 'products',
			data: {
				// productCodes,
				// total: totalProducts,
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

// module.exports.adminEditProductCode = async (req, res) => {
// 	const products = await Product.find({idProductCode: req.params.id})
	
// 	res.render('components/admin/admin-base', {
// 		content: 'product',
// 		products: products
// 	})
// }

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
				total,
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
	const orders = await Order.find()
	// console.log(orders)
	res.render('components/admin/admin-base', {
		content: 'orders',
		data: {
			orders
		},
	})
}
