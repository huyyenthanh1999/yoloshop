const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
	// check if user is exists
	// try {
	const { email, phoneNumber } = req.body
	const user = await User.findOne({ $or: [{ email }, { phoneNumber }] })

	if (user)
		return res
			.status(400)
			.json({ status: 'fail', message: 'User đã tồn tại.' })

	// hash password and register user
	req.body.password = await bcrypt.hash(req.body.password, 10)
	const newUser = new User({
		...req.body,
	})

	await newUser.save()
	newUser.password = ''

	// tao token
	const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_KEY)


	// respond
	res.status(200).json({
		status: 'success',
		data: { newUser, token },
	})
	// } catch (error) {
	// 	res.status(500).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
}

// login
module.exports.login = async (req, res) => {
	// console.log('vao login')

	// lay email or phone, va password
	const { email, phoneNumber, password } = req.body
	console.log(req.body)


	// tim user
	const user = await User.findOne({ $or: [{ email }, { phoneNumber }] }).select('+password')
	// user.select('+password')


	// ko user => tra loi
	if (!user)
		return res.status(400).json({
			status: 400,
			message: 'User khong ton tai'
		})

	console.log(user)

	// user => check password
	const isPassword = await bcrypt.compare(password, user.password)

	// password khong dung
	if (!isPassword)
		return res.status(400).json({
			status: 400,
			message: 'Mật khẩu hoặc email dùng không đúng'
		})

	// password dung 

	// tao token
	const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY)

	// toke

	user.password = ''
	res.status(200).json({
		status: 200,
		data: {
			user: user,
			token
		}
	})

}

// get login

module.exports.getLogin = (req, res) => {
	res.render('pages/login')
}

// logout




// edit user
module.exports.editUser = async (req, res) => {
	const idUser = req.params.id
	try {
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
