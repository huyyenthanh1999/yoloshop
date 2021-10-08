const Cart = require('../models/CartModel')

module.exports.renderCheckout = (req, res) => {
	res.render('pages/checkout')
}
