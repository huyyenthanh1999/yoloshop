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
		message: {
			type: String,
			required: false,
		},
		address: {
			type: String,
			required: true,
		},
		products: [{ 
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
			enum: ['Đang chờ', 'Đã hủy', 'Đã giao'],
			default: 'Đang chờ'
		},
		payment: {
			type: String,
			enum: ['transfer', 'cod'],
			default: 'cod'
		}
	},
	{
		timestamps: true,
	}
)

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel
