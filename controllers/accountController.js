const User = require('../models/userModel');

// get account

module.exports.getAccount = async (req, res) => {
    try {
        //get user detail from localStorage

        // var accountId= localStorage.getItem('user');
        console.log(req.cookie)
        // console.log(accountId);
        // const account = await User.findOne({_id: accountId});
        // console.log(account);


        // doc token
        // ma hoa id
        // tim user
        res.render('pages/account', {user})
        // if (!account)
        //     return res.status(400).json({
        //         status: 'fail',
        //         message: 'Không tìm thấy trang',
        //     })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Lỗi server',
        })
    }
}

//edit account
module.exports.editAccount = async (req, res) => {
    const accountId = req.params.id
    try {
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