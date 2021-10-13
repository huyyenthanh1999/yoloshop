const Product = require('../models/productModel')
const User = require('../models/userModel')

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
	try {
		const total = await User.countDocuments()
		const customers = await User.find()
		res.render('components/admin/admin-base', {
			content: 'customers',
			data: {
				customers,
				total
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
	res.render('components/admin/admin-base', {
		content: 'orders',
		data: {
			
		}
	})
}