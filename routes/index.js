const router = require('express').Router()
const {checkUser} = require('../middlewares/checkUser')

// gán req.user
router.use(checkUser)

const {getLog} = require('../middlewares/getNum');
router.use(getLog)
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

// users
const userRoute = require('./userRoute')
router.use("/users", userRoute)

// orders
const orderRoute = require('./orderRoute')
router.use("/orders", orderRoute)

// contact
const contactRoute = require('./contactRoute')
router.use('/contact', contactRoute)

//news
const newsRoute = require('./newsRoute.js')
router.use("/news", newsRoute)

// Not found page
router.use((req, res) => res.render('pages/notfound'))

module.exports = router