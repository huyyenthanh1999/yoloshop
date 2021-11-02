const mongoose = require('mongoose')

const ProductCodeSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		cost: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		type: {
			type: String,
		},
		images: {
			type: Array,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
)

ProductCodeSchema.pre(/^find/, function (next) {
	this.find({ active: true })
	next()
})

module.exports = mongoose.model('ProductCode', ProductCodeSchema)
