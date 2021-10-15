const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			required: true,
		},
		phoneNumber: {
			type: 'String',
			unique: true,
            required: true,
		},
		email: {
			type: 'String',
			required: true,
			unique: true,
		},
		password: {
			type: 'String',
			required: true,
			select: false,
		},
		avatar: {
			type: 'String',
			default: '/public/images/userImg/default-avatar.png',
		},
		role: {
			type: 'String',
			default: 'user',
		},
	},
	{
		timestamp: true,
	}
)

module.exports = mongoose.model('User', UserSchema)
