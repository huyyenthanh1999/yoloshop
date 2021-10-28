const mongoose = require('mongoose')

const NewsSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		banner: {
			type: String,
			required: true
		},
		content: {
			type: String,
            required: true
		},
		description: {
			type: String,
            required: true
		}
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('News', NewsSchema)
