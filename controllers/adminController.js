const Product = require('../models/productModel')

// render dashboard
module.exports.adminDashboard = (req, res) => {
	res.render('components/admin/admin-base', {
		content: 'dashboard',
	})
}

// return data of dashboard
module.exports.adminDashboardData = async (req, res) => {
	try {
		const productsCount = await Product.countDocuments()

		// response
		res.status(200).json({
			status: 'success',
			data: {
				productsCount,
				customersCount: 10,
				ordersCount: 20,
				salesCount: 12,
			},
		})
	} catch (error) {
		res.status(400).json({
			status: 400,
			message: 'Lỗi server',
		})
	}
}

// see and edit the product
module.exports.adminEditProduct = async (req, res) => {
	res.render('components/admin/admin-base', {
        content: 'add-product',
    })
}
