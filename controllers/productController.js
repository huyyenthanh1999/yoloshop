const Product = require('../models/productModel')
const ProductCode = require('../models/productCodeModel')
const imgbbUploader = require('imgbb-uploader')
const { removeVI } = require('jsrmvi')

module.exports.addProductCode = async (req, res) => {
	try {
		// console.log(req.body)
		const { name, cost, description, type } = req.body

		// console.log(req.files)

		// get images of product
		let images = req.files.map((file) => {
			return file.path
		})

		// upload img to host
		images = await Promise.all(
			images.map(async (file) => {
				const upload = await imgbbUploader(process.env.IMGBB_KEY, file)
				return upload.url
			})
		)

		let productCode = await ProductCode.findOne({
			name,
			cost,
			description,
			type,
			images: [...images],
		})

		if (!productCode) {
			productCode = new ProductCode({
				name,
				cost,
				description,
				type,
				images,
			})
			await productCode.save()
		}

		// create product
		// const product = new Product({
		// 	idProductCode: productCode._id,
		// 	color,
		// 	size,
		// 	total,
		// })

		// await product.save()
		// await product.populate('idProductCode')

		// respond the result
		res.status(200).json({
			status: 'success',
			data: {
				productCode,
			},
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.addProduct = async (req, res) => {
	try {
		// tìm kiếm xem đã tồn tại hay chưa
		const product = await Product.findOne({ ...req.body })
		if (product)
			return res.status(200).json({
				status: 'success',
				product,
			})

		const newProduct = new Product({
			...req.body,
		})
		await newProduct.save()
		res.status(200).json({
			status: 'success',
			product: newProduct,
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.editProductCode = async (req, res) => {
	// get id of product
	const idProductCode = req.params.id

	// try {
	// find product
	let productCode = await ProductCode.findById(idProductCode)

	// console.log(productCode)

	if (!productCode) {
		return res.status(400).json({
			status: 'fail',
			message: 'Không tìm thấy sản phẩm',
		})
	}

	// find if of product code
	// let productCode = await ProductCode.findById(product.idProductCode)

	// get images if admin changes images
	let images = req.files.map((file) => {
		return file.path
	})

	if (images.length > 0) {
		// images = images.map((file) => file.filename)
		// console.log('vao doi')
		// upload img to host
		images = await Promise.all(
			images.map(async (file) => {
				// console.log(file)
				const upload = await imgbbUploader(process.env.IMGBB_KEY, file)
				return upload.url
			})
		)
		productCode.images = images
		// console.log(productCode)
		// await productCode.save()
	}

	// merge product code object
	for (let item in req.body) {
		// if (product[item]) product[item] = req.body[item]
		if (productCode[item]) productCode[item] = req.body[item]
	}

	// await product.save()
	await productCode.save()

	// xóa toàn bộ products thuộc productCode
	await Product.deleteMany({ idProductCode: productCode._id })

	// respond
	res.status(200).json({
		status: 'success',
		data: {
			productCode,
		},
	})
	// } catch (error) {
	// 	res.status(500).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
}

module.exports.deleteProductCode = async (req, res) => {
	try {
		const productCode = await ProductCode.findById(req.params.id)

		// tìm và xóa tất cả các product thuộc productCode đó
		await Product.deleteMany({ idProductCode: productCode._id })

		await ProductCode.findByIdAndDelete(req.params.id)

		res.status(200).json({
			status: 'success',
			message: 'Xóa sản phẩm thành công',
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.deleteProduct = async (req, res) => {
	// get id of product
	const idProduct = req.params.id

	try {
		await Product.findByIdAndDelete(idProduct)

		res.status(200).json({
			status: 'success',
			message: 'Xóa sản phẩm thành công',
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.getDetail_Product = async (req, res) => {
	try {
		// find product
		const product = await Product.findOne({
			$and: [
				{ idProductCode: req.body.idProductCode },
				{ size: req.body.size },
				{ color: req.body.color },
			],
		}).populate('idProductCode')

		// respond
		if (product)
			return res.status(200).json({
				status: 'success',
				product,
			})
		res.status(400).json({
			status: 'fail',
			message: 'Không tìm thấy sản phẩm',
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.getDetailProductCode = async (req, res) => {
	// get id of product
	const idProductCode = req.params.id

	try {
		// find product code
		const productCode = await ProductCode.findById(idProductCode).lean()

		if (!productCode) {
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy sản phẩm',
			})
		}

		// find the list of products
		const products = await Product.find(
			{ idProductCode: productCode._id },
			{ color: 1, size: 1, total: 1 }
		).lean()

		productCode.products = products
		// console.log(productCode)
		return res.status(200).json({
			status: 'success',
			data: {
				productCode,
			},
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

// example:
// /products/api?search=""&filter=""
module.exports.getAllProduct = async (req, res) => {
	// console.log(query)
	// try {
	// tổng tất cả sản phẩm
	// let totalProducts = 0
	// const products = await Product.find().populate('idProductCode')

	const perPage = 10
	const currentPage = req.query.page
	console.log(currentPage)
	const skip = perPage * (currentPage -1) || 1
	// console.log(skip)
	let productCodes = await ProductCode.find().skip(skip).limit(perPage).lean()


	let totalPages = await ProductCode.countDocuments()
	totalPages = Math.ceil(totalPages/perPage)
	// console.log(productCodes.length)

	// // đếm số lượng sản phẩm trong productCodes
	// for (let item of productCodes) {
	// 	const products = await Product.find(
	// 		{ idProductCode: item._id },
	// 		{ total: 1, color: 1, size: 1 }
	// 	).lean()
	// 	// console.log(products)
	// 	let totalProductsOfCode = 0
	// 	products.forEach((item) => {
	// 		totalProductsOfCode += item.total
	// 	})

	// 	item.total = totalProductsOfCode
	// 	item.products = products
	// 	// console.log(item)
	// 	// totalProducts += totalProductsOfCode
	// }
	// tổng tất cả sản phẩm
	let totalProducts = 0
	// const products = await Product.find().populate('idProductCode')

	// const productCodes = await ProductCode.find().lean()

	// đếm số lượng sản phẩm trong productCodes
	for(let item of productCodes){
		const products = await Product.find(
			{ idProductCode: item._id },
			{ total: 1, color: 1, size: 1 }
		).lean()
		// console.log(products)
		let totalProductsOfCode = 0
		products.forEach((item) => {
			totalProductsOfCode += item.total
		})

		item.total = totalProductsOfCode
		item.products = products
		// console.log(item)
		totalProducts += totalProductsOfCode
	}

	// console.log(productCodes)
	// console.log(totalProducts)

	// filter follow search
	const option = { replaceSpecialCharacters: false }
	const search = removeVI(req.query.search, option)
	productCodes = productCodes.filter((item) => {
		return removeVI(item.name, option).includes(search)
	})

	// console.log(productCodes)
	// console.log(totalProducts)

	res.status(200).json({
		productCodes,
		total: totalProducts,
		totalPages
	})
	// } catch (error) {
	// 	res.status(500).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
}

// add product to cart
module.exports.userAddProduct = async (req, res) => {
	// console.log('hello')
	try {
		const _id = req.params.id
		const product = await Product.findById(_id).populate('idProductCode')

		const cartItem = {
			_id,
			color: req.query.color,
			size: req.query.size,
			quantity: +req.query.quantity,
			image: product.idProductCode.images[0],
			name: product.idProductCode.name,
		}

		const cart = req.session.cart || []
		let totalMoney = +req.session.totalMoney || 0

		// kiểm tra xem sản phẩm đã được thêm vào trước đó không
		// nếu đã được thêm thì chỉ cần tăng số lượng product
		// nếu chưa thêm thì thêm
		let newProduct = true
		for (let i = 0; i < cart.length; i++) {
			if (
				cart[i]._id == cartItem._id &&
				cart[i].size == cartItem.size &&
				cart[i].color == cartItem.color
			) {
				// them so luong san pham va them tien
				cart[i].quantity += cartItem.quantity
				totalMoney += cartItem.quantity * product.idProductCode.cost

				newProduct = false
				break
			}
		}

		if (newProduct) {
			cart.push(cartItem)
			totalMoney += cartItem.quantity * product.idProductCode.cost
		}

		req.session.cart = cart
		req.session.totalMoney = totalMoney
		// console.log(req.session.cart)
		// console.log(req.session.totalMoney)
		res.status(200).json({
			status: 'success',
			message: 'Đã thêm sản phẩm vào giỏ hàng',
		})
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'Không tìm thấy id sản phẩm',
		})
	}
}
