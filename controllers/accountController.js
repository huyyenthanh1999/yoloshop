const User = require('../models/userModel');
const Product = require('../models/productModel')
const ProductCode = require('../models/productCodeModel')
const jwt = require('jsonwebtoken')

// get account

module.exports.getAccount = async (req, res) => {
    try {
        //giai ma token
        var decoded  = jwt.verify(req.cookies.tokenId, process.env.TOKEN_KEY);
        //doc id
        const accountId = decoded.userId;
        //tim id trong db
        var account = await User.findById(accountId);
        if (!account)
			return res.status(400).json({
				status: 'fail',
				message: 'Không tìm thấy trang',
			})
        res.render('pages/account', {user: account})
    } catch (error) {
        // res.status(500).json({
        //     status: 'fail',
        //     message: 'Lỗi server',
        // }) 
        res.redirect('/users/login')
    }
}

//edit account
module.exports.editAccount = async (req, res) => {
    try {
        const accountId = req.params.id
        const account = await User.findByIdAndUpdate(accountId, req.body)
        if (!account)
            return res.status(400).json({
                status: 'fail',
                message: 'Không tìm thấy user',
            })

        res.status(200).json({
            status: 'success',
            data: { account },
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Lỗi server',
        })
    }
}