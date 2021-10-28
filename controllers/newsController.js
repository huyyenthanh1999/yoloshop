const News = require('../models/newsModel');

module.exports.getAllNews = async (req, res) => {
    try {
        const allNews = await News.find()
        res.render('pages/news')
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