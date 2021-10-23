const ProductCode = require('../models/productCodeModel');
const jwt = require('jsonwebtoken')
const Cart = require('../models/cartModel');
const slides = require('../public/data/sliderData')
const cards = require('../public/data/cardData')

module.exports.getAllData = async (req, res) => {
	try {
	// var decoded = jwt.verify(req.cookies.tokenId, process.env.TOKEN_KEY);
        // const userId = decoded.userId || 0;	
		// console.log(userId)
		var cartNum;
		// Cartfolio.findOne({userId: '616ec7d601129af4f9c5c194'})
		// .then(cart => cartNum = cart)
		// .catch(err => cartNum = 0)
		const products = await ProductCode.find()
		const arr = Array.from(Array(products.length).keys())

		var hotIndexes = getRandom(arr, 4)
		var newIndexes = getRandom(arr, 8)
		var popularIndexes = getRandom(arr, 8)

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

		res.render('pages/home', {
			slides,
			cards,
			hotIndexes,
			newIndexes,
			popularIndexes,
			products,
			// cartNum: cartNum.products.length
		})
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}
