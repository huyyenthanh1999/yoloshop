const router = require('express').Router()

// auth
const authRoute = require('./authRoute')
router.use('/auth', authRoute)

// home page
const indexRoute = require('./indexRoute')
router.use('/', indexRoute)


// products
const productRoute = require('./productRoute')
router.use('/products', productRoute)


// account
const accountRoute = require('./accountRoute')
router.use('/account', accountRoute)


// cart
const cartRoute = require('./cartRoute')
router.use('/cart', cartRoute)


// checkout
const checkoutRoute = require('./checkoutRoute')
router.use('/checkout', checkoutRoute)


// admin
const adminRoute = require("./adminRoute");
router.use("/admin", adminRoute);


// Not found page
router.use((req, res) => res.render('pages/notfound'))

module.exports = router