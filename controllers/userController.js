const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const imgbbUploader = require('imgbb-uploader')

// logout

// edit user
module.exports.editUser = async (req, res) => {
	const idUser = req.params.id
	try {
		const file = req.file
		
		if(file) {
			const upload = await imgbbUploader(process.env.IMGBB_KEY, file.path)
			req.body.avatar = upload.url
			// console.log(req.body)
		}

		const user = await User.findByIdAndUpdate(idUser, req.body)
		if (!user)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy user',
			})

		res.status(200).json({
			status: 'success',
			data: { user },
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.editUserFromUser = () => {
	// const id = cookie 
	// tim user find().select('password')


	// => 
	// 
	// bcrypt.compare(req.body.pass, user.pass)

	// res
}


module.exports.deleteUser = async (req, res) => {
	const idUser = req.params.id
	try {
		const user = await User.findByIdAndDelete(idUser)
		if (!user)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy user',
			})

		res.status(200).json({
			status: 'success',
			message: 'Xóa user thành công',
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.getDetailUser = async (req, res) => {
	const idUser = req.params.id
	try {
		const user = await User.findById(idUser)
		if (!user)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy user',
			})

		res.status(200).json({
			status: 'success',
			user,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.getAllUser = async (req, res) => {
	try {
		const users = await User.find()

		res.status(200).json({
			status: 'success',
			users,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
