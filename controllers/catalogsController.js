const Product = require('../models/productModel')
const ProductCode = require('../models/productCodeModel')
const Cart = require('../models/cartModel')
const { render } = require('ejs')
module.exports.getProductDetail = async (req, res) => {
	const idProductCode = req.params.id
	// try {
		const productCode = await ProductCode.findById(idProductCode)
		const products = await Product.find({
			idProductCode: idProductCode,
		})
		var sizes = products.map((e) => e.size)
		var colors = products.map((e) => e.color)
		//get all product
		const allProductCodes = await ProductCode.find()
		const arr = Array.from(Array(allProductCodes.length).keys())
		var moreIndexes = getRandom(arr, 8)
		function getRandom(arr, n) {
			var result = new Array(n),
				len = arr.length,
				taken = new Array(len)
			if (n > len)
				throw new RangeError('getRandom: more elements taken than available')
			while (n--) {
				var x = Math.floor(Math.random() * len)
				result[n] = arr[x in taken ? taken[x] : x]
				taken[x] = --len in taken ? taken[len] : len
			}
			return result
		}
		res.render('pages/product_detail', {
			moreIndexes,
			products: allProductCodes,
			product: productCode,
			sizes: [...new Set(sizes)],
			colors: [...new Set(colors)],
		})
	// } catch (error) {
	// 	res.status(500).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
}
// module.exports.getsp = async (req, res) => {
//   console.log(req.query);
// };
module.exports.getCatalogs = async (req, res) => {
	// var arrType = req.query.type;
	// var arrColor = req.query.color;
	// var arrSize = req.query.size;
	// console.log(arrSize);
	// if (arrSize[0] === "") {
	//   arrSize = ["s", "m", "l", "xl"];
	// }
	// if (arrColor[0] === "") {
	//   arrColor = ["red", "white", "blue", "orange"];
	// }
	// if (arrType[0] === "") {
	//   arrType = ["ao-somi", "ao-thun", "quan-jean"];
	// }
	// try {
	//   const typeProduct = await ProductCode.find({
	//     type: { $in: arrType },
	//   });
	//   const idCode = typeProduct.map((product) => {
	//     return product.id;
	//   });
	//   const products = await Product.find({
	//     idProductCode: { $in: idCode },
	//     color: { $in: arrColor },
	//     size: { $in: arrSize },
	//   });
	//   // console.log(products);
	//   const listId = products.map((product) => {
	//     return product.idProductCode;
	//   });
	//   // console.log(listId);
	//   const fnFilter = (arr) => {
	//     return Array.from(new Set(arr));
	//   };
	//   const arrId = fnFilter(listId);
	//   const catalogProduct = await ProductCode.find({
	//     _id: { $in: arrId },
	//   });
	//   res.status(200).json({
	//     status: "success",
	//     data: {
	//       catalogProduct,
	//     },
	//   });
	// } catch (error) {
	//   res.status(500).json({
	//     status: "fail",
	//     message: "Lỗi server",
	//   });
	// }
}

module.exports.getCustomProduct = async (req, res) => {
	try {
		let { page, size, color, type } = req.query
		const perProduct = 12

		type = type.split(',')
		size = size.split(',')
		color = color.split(',')

		type = type[0] == '' ? [] : type
		color = color[0] == '' ? [] : color
		size = size[0] == '' ? [] : size

		// find follow type
		let productCodes = await ProductCode.find().lean()
		if (type.length > 0)
			productCodes = productCodes.filter((item) => type.includes(item.type))

		// find follow color
		// tìm tất cả các products thuộc các productCode trên
		let products = []
		for (let code of productCodes) {
			const pro = await Product.find({ idProductCode: code._id }).lean()
			products.push(...pro)
		}

		if (color.length > 0)
			products = products.filter((pro) => {
				return color.includes(pro.color)
			})
		if (size.length > 0)
			products = products.filter((pro) => {
				return size.includes(pro.size)
			})

		productCodes = productCodes.filter((code) => {
			for (let i = 0; i < products.length; i++)
				if (products[i].idProductCode == code._id) return true
		})

		// phan trang
		const perPage = 9
		const totalPages = Math.ceil(productCodes.length / perPage)
		// pagination
		let begin = (page - 1) * perPage
		let end = page * perPage
		// console.log(begin, end)
		productCodes = productCodes.slice(begin, end)

		res.status(200).json({
			status: 'success',
			data: productCodes,
			totalPages,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.getAllCatalog = async (req, res) => {
	try {
		let perPage = 5
		let page = req.params.page || 1

		//get all type
		const productCodes = await ProductCode.find()
		const types = productCodes.map((productCode) => productCode.type)
		var uniqueTypes = [...new Set(types)]

		//get all color
		const products = await Product.find()
		const colors = products.map((product) => product.color)
		var uniqueColors = [...new Set(colors)]

		//get all size
		const sizes = products.map((product) => product.size)
		var uniqueSizes = [...new Set(sizes)]

		//render data each page
		ProductCode.find()
			// .skip(perPage * page - perPage)
			// .limit(perPage)
			.exec((err, prds) => {
				ProductCode.countDocuments((err, count) => {
					if (err) return next(err)

					res.render('pages/product', {
						products: [],
						types: uniqueTypes,
						colors: uniqueColors,
						sizes: uniqueSizes,
						// current: page,
						current: 0,
						// pages: Math.ceil(count / perPage),
						pages: 0,
					})
				})
			})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

//get total quantity
module.exports.getVariantTotal = async (req, res) => {
	try {
		const color = req.query.color
		const size = req.query.size
		const idProductCode = req.query.idProductCode
		const currProduct = await Product.findOne({ idProductCode, color, size })
		if (currProduct) {
			res.send({
				total: currProduct.total,
			})
		} else {
			res.send({
				total: 0,
			})
		}
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.getAllInfoProduct = async (req, res) => {
	try {
		const idProductCode = req.query.productCodeId
		const listVariants = await Product.find({ idProductCode })
		res.send({
			listVariants,
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.addToCart = async (req, res) => {
	// try {
		console.log(req.user)
		const userId = req.user._id
		const productId = req.body.idVariant
		const quantity = req.body.quantity
		const hasCart = await Cart.findOne({ userId })
		if (hasCart) {
			const listProductId = hasCart.products.map((product) => product.productId)
			const hasVariant = listProductId.indexOf(productId)
			if (hasVariant !== -1) {
				const cart = await Cart.findOneAndUpdate(
					{ userId, 'products.productId': productId },
					// {products: {$elemMatch: {productId: productId}}}
					{ $inc: { 'products.$.quantity': quantity } }
				)
				res.status(200).json({
					message: 'thêm vào giỏ hàng thành công',
					data: cart,
					status: 'success',
				})
			} else {
				const cart = await Cart.findOneAndUpdate(
					{ userId },
					{ $push: { products: { productId, quantity } } }
				)
				res.status(200).json({
					message: 'thêm vào giỏ hàng thành công',
					data: cart,
					status: 'success',
				})
			}
		} else {
			const cart = await Cart.create({
				userId,
				products: [{ productId, quantity }],
			})
			// res.status(200).json({
			// 	message: 'thêm vào giỏ hàng thành công',
			// 	data: cart,
			// 	status: 'success',
			// })
			res.status(200).json({
				message: 'thêm vào giỏ hàng thành công',
				data: cart,
				status: 'success',
				isNew: true,
			})
		}
	// } catch (error) {
	// 	res.status(500).json({
	// 		status: 'fail',
	// 		message: 'Lỗi server',
	// 	})
	// }
}
