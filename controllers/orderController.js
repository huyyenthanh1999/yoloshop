const Order = require('../models/orderModel')
const { removeVI } = require('jsrmvi')

module.exports.getAllOrders = async (req, res) => {
    const perPage = 10
	const currentPage = +req.query.page || 1
	
	let skip = perPage * (currentPage -1) || 1

	
	// filter follow search
	// const option = { replaceSpecialCharacters: false }
	// const search = removeVI(req.query.search, option)
	// let Orders = await ProductCode.find().lean()
	// productCodes = productCodes.filter((item) => {
	// 	return removeVI(item.name, option).includes(search)
	// })

	// let begin = (currentPage -1 )* perPage
	// let end = currentPage * perPage
	// console.log(begin, end)
	// productCodes = productCodes.slice(begin, end)



	let totalOrders = await Order.countDocuments()
	let totalPages = Math.ceil(totalOrders /perPage)
    
    
    const orders = await Order.find()





    const total = orders.length

    res.status(200).json({
        orders,
        totalPages,
        total: totalOrders
    })
}

// na