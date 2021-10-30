const News = require('../models/newsModel');
const ProductCode = require('../models/productCodeModel');

module.exports.getAllNews = async (req, res) => {
    try {
        const products = await ProductCode.find().lean();
		const arr = Array.from(Array(products.length).keys());
        var featuredIndex = getRandom(arr, 10)

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
        // const allNews = await News.find()
        res.render('pages/news',{
            products,
            featuredIndex
        })
    } catch (error) {
        res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
    }
}

module.exports.getDetailNews = async (req, res) => {
    try {
        res.render('pages/news-detail',{
            
        })
    } catch (error) {
        res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
    }
}

module.exports.getAddNewPage = async (req, res) => {
	try {
		
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}