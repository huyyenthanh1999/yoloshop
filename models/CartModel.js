const mongoose = require('mongoose')

const CartSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			ref: 'User',
		},
		list: [{ 
			productId: {
				type: String,
				required: true,
				ref: 'Product'
			},
			quantity: {
				type: Number,
				required: true,
			}
		}],
		totalPrice: {
			type: Number,
            required: true,
		},
	},
	{
		timestamps: true,
	}
)

const CartModel = mongoose.model('Cart', CartSchema)

module.exports = CartModel
