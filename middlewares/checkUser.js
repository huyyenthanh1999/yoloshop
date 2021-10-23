const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

module.exports.checkUser = async (req, res, next) => {
    // try {
        // const tokenId = req.cookie.tokenId
        // // verify id
        // const idUser = jwt.verify(process.env.TOKEN_KEY, tokenId)

        // const user = await User.findById(idUser)

        next()
    // } catch (error) {
    //     res.redirect('/auth/login')
    // }

}