const Cart = require('../models/CartModel')

module.exports.renderCart = (req, res) => {
	res.render('pages/cart', {
		cart: req.session.cart || [],
		totalMoney: req.session.totalMoney || 0,
	})
}

module.exports.loadCart = async (req, res) => {
	try {
		// find theo id
		const carts = await Cart.find({})

		// res.status(200).json({
		// 	status: 'success',
		//     carts,
		// })
		// res.render('pages/cart', {
		//     carts
		// });
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.getDetailCart = async (req, res) => {
	try {
		const cart = await Cart.find({ _id: '615a49d9ff54f53a4fa59382' })
			//   .populate("userId")
			.populate({ path: 'list', populate: { path: 'productId' } })

		res.status(200).json({
			status: 'success',
			cart,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// module.exports.create = async (req, res) => {
// 	// check if cart is exists
// 	try {
// 		const { email, phoneNumber } = req.body
// 		const user = await User.findOne({ $or: [{ email }, { phoneNumber }] })

// 		if (user)
// 			return res.status(400).json({
//                 status: 'fail',
//                 message: 'User đã tồn tại.'
//             })

// 		// hash password and register user
// 		req.body.password = await bcrypt.hash(req.body.password, 10)
// 		const newUser = new User({
// 			...req.body,
// 		})

// 		await newUser.save()
// 		newUser.password = ''

// 		// respond
// 		res.status(200).json({
// 			status: 'success',
// 			data: { newUser },
// 		})
// 	} catch (error) {
// 		res.status(500).json({
// 			status: 'fail',
// 			message: 'Lỗi server',
// 		})
// 	}
// }

module.exports.updateCart = async (req, res) => {
	const cartId = req.params.id
	try {
		const cart = await Cart.findByIdAndUpdate({ _id: cartId }, req.body)
		if (!cart)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy cart',
			})

		res.status(200).json({
			status: 'success',
			cart,
			// data: { cart },
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.deleteCart = async (req, res) => {
	const cartId = req.params.id
	try {
		const cart = await Cart.findByIdAndDelete({ _id: cartId })
		if (!cart)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy cart',
			})

		res.status(200).json({
			status: 'success',
			message: 'Xóa cart thành công',
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// module.exports.getDetailCart = async (req, res) => {
//   const cartId = req.params.id;
//   try {
//     const cart = await Cart.findById({ _id: cartId });
//     if (!cart)
//       return res.status(400).json({
//         status: "fail",
//         message: "Không tìm thấy cart",
//       });

//     res.status(200).json({
//       status: "success",
//       cart,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "Lỗi server",
//     });
//   }
// };

module.exports.getAllCart = async (req, res) => {
	try {
		const carts = await Cart.find({})

		res.status(200).json({
			status: 'success',
			carts,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
