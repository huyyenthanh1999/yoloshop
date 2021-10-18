const mongoose = require('mongoose')

const CartSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			ref: 'User',
		},
		cost: {
			type: Number,
			required: true,
		},
		productId: {
			type: String,
			required: true,
			ref: 'Product'
		},
		quantity: {
			type: Number,
			required: true,
		}
	},
	{
		timestamp: true,
	}
)

const CartModel = mongoose.model('Cart', CartSchema)

module.exports = CartModel
