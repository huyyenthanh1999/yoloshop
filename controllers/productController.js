const Product = require('../models/productModel')
const ProductCode = require('../models/productCodeModel')
const imgbbUploader = require('imgbb-uploader')

module.exports.addProduct = async (req, res) => {
	try {
		// console.log(req.body)
		const { name, cost, description, type, color, size, total } = req.body

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
			images: [...images]
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
		const product = new Product({
			idProductCode: productCode._id,
			color,
			size,
			total,
		})

		await product.save()
		await product.populate('idProductCode')

		// respond the result
		res.status(200).json({
			status: 'success',
			data: {
				product,
			},
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.editProduct = async (req, res) => {
	// get id of product
	const idProduct = req.params.id

	// try {
		// find product
		let product = await Product.findById(idProduct)

		if (!product) {
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy sản phẩm',
			})
		}

		// find if of product code
		let productCode = await ProductCode.findById(product.idProductCode)

		// get images if admin changes images
		let images = req.files.map((file) => {
			return file.path
		})

		if (images.length > 0) {
			// images = images.map((file) => file.filename)

			// upload img to host
			images = await Promise.all(
				images.map(async (file) => {
					// console.log(file)
					const upload = await imgbbUploader(process.env.IMGBB_KEY, file)
					return upload.url
				})
			)
			productCode.images = images
		}

		// merge product object
		for (let item in req.body) {
			if (product[item]) product[item] = req.body[item]
			if (productCode[item]) productCode[item] = req.body[item]
		}

		await product.save()
		await productCode.save()

		// respond
		res.status(200).json({
			status: 'success',
			data: {
				product: await product.populate('idProductCode'),
			},
		})
	// } catch (error) {
	// 	res.status(500).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
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

module.exports.getDetailProduct = async (req, res) => {
	// get id of product
	const idProduct = req.params.id

	try {
		// find product
		const product = await Product.findById(idProduct).populate('idProductCode')

		// respond
		if (product)
			return res.status(200).json({
				status: 'success',
				data: {
					product,
				},
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

module.exports.getAllProduct = async (req, res) => {
	try {
		const products = await Product.find().populate('idProductCode')
		res.status(200).json({
			status: 'success',
			data: {
				products,
			},
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
