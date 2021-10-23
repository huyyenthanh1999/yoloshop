const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
	{
		idProductCode: {
			type: String,
			required: true,
			ref: 'ProductCode',
		},
		color: {
			type: String,
		},
		size: {
			type: String,
		},
		total: {
			type: Number,
            required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Product', ProductSchema)
