const News = require('../models/newsModel');
const ProductCode = require('../models/productCodeModel');
const nodemailer = require('nodemailer');
const imgbbUploader = require('imgbb-uploader')
const dotenv = require('dotenv');
dotenv.config();

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
        const news = await News.find();
        res.render('pages/news',{
            products,
            featuredIndex,
			news
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
        const news = await News.find();
        res.render('pages/news-detail',{
            news
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
		res.render('pages/add-news')
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.sendMail = async (req, res) => {
	try {
		const userMail = req.body.email;
    	// Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
		const adminEmail = process.env.GMAIL_ACCOUNT;
		const adminPassword = process.env.GMAIL_PASSWORD;
		
		const mailHost = 'smtp.gmail.com';
		const mailPort = 587;
		
		await sendMail(userMail,'Welcome to YOLOShop','<h2>Thanks for using YoLoShop</h2>')
		function sendMail(to, subject, htmlContent){
			const transporter = nodemailer.createTransport({
			  host: mailHost,
			  port: mailPort,
			  secure: false, 
			  auth: {
				user: adminEmail,
				pass: adminPassword
			  }
			})
		  
			const options = {
			  from: adminEmail, 
			  to: to,
			  subject: subject,
			  html: htmlContent
			}
		  
			return transporter.sendMail(options)	
		}
		res.send('<h3>Your email has been sent successfully.</h3>')
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Lỗi server',
		})
	}
}

module.exports.addNews = async (req, res) => {
	try {
		// update banner
		if (req.file) {
			const upload = await imgbbUploader(process.env.IMGBB_KEY, req.file.path)
			req.body.banner = upload.url
		}
        await News.create(req.body)
		res.status(200).json({
			status: 'success'
		})
	} catch (error) {
		console.log(error)
		// res.status(500).json({
		// 	status: 'fail',
		// 	message: 'Lỗi server',
		// })
	}
}