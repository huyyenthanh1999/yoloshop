const Cart = require('../models/cartModel')

module.exports.renderCheckout = (req, res) => {
	// console.log(req.query.q)
	res.render('pages/checkout')
}

module.exports.goToCheckout = (req, res) => {
	console.log(req.body)
	res.render('pages/checkout')
}
