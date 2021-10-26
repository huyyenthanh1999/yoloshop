const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const imgbbUploader = require('imgbb-uploader')
const path = require('path')

// edit user
module.exports.editUser = async (req, res) => {
	const idUser = req.params.id
	try {
		const user = await User.findById(idUser)
		if (!user)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy user',
			})

		// update user
		if (req.file) {
			const upload = await imgbbUploader(process.env.IMGBB_KEY, req.file.path)

			req.body.avatar = upload.url
		}

		await User.updateOne({ _id: idUser }, req.body)

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

// co ca search
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
