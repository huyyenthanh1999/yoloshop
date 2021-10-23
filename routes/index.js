const router = require('express').Router()

// home page
const indexRoute = require('./indexRoute')
router.use('/', indexRoute)

// auth
const authRoute = require('./authRoute')
router.use('/auth', authRoute)

// for admin page to get products
const productRoute = require('./productRoute')
router.use('/products', productRoute)

// for products page
const catalogsRoute = require("./catalogsRoute");
router.use("/products", catalogsRoute);


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

const userRoute = require('./userRoute')
router.use("/users", userRoute)


// Not found page
router.use((req, res) => res.render('pages/notfound'))

module.exports = router