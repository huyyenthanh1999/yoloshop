const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			ref: 'User',
		},
		receiverName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: false,
		},
		detailAddress: {
			type: String,
			required: true,
		},
		orderList: [{ 
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
		totalCost: {
			type: Number,
            required: true,
		},
		status: {
			type: String,
            required: true,
		},
	},
	{
		timestamp: true,
	}
)

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel
