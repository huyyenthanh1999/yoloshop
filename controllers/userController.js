const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const imgbbUploader = require('imgbb-uploader')
const path = require('path')
const { removeVI } = require('jsrmvi')

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

// include search
module.exports.getAllUser = async (req, res) => {
	// try {
		const perPage = 10
		const currentPage = +req.query.page || 1
		
		// let skip = perPage * (currentPage -1) || 1
	
		
		// filter follow search
		const option = { replaceSpecialCharacters: false }
		const search = removeVI(req.query.search, option)
		let users = await User.find().lean()
		users = users.filter((item) => {
			return removeVI(item.name, option).includes(search)
		})
	
		let begin = (currentPage -1 )* perPage
		let end = currentPage * perPage
		// console.log(begin, end)
		users = users.slice(begin, end)
		console.log(users)
	
	
		let totalUsers = await User.countDocuments()
		let totalPages = Math.ceil(totalUsers/perPage)
		
	
		// đếm số lượng sản phẩm trong users và gán products vào users
		// for(let item of users){
		// 	const products = await Product.find(
		// 		{ idUser: item._id },
		// 		{ total: 1, color: 1, size: 1 }
		// 	).lean()
		// 	let totalProductsOfCode = 0
		// 	products.forEach((item) => {
		// 		totalProductsOfCode += item.total
		// 	})
	
		// 	item.total = totalProductsOfCode
		// 	item.products = products
	
		// }
	
		res.status(200).json({
			users,
			total: totalUsers,
			totalPages
		})
		// } catch (error) {
		// 	res.status(500).json({
		// 		status: 'fail',
		// 		message: 'Lỗi server',
		// 	})
		// }
}
