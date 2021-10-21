require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

// add middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

// session middleware
// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: true,
// 		name: 'sessionId'
// 	})
// )

// setup view
app.set('view engine', 'ejs')
app.set('views', 'views')


// setup public folder
app.use('/public', express.static(path.join(__dirname, 'public')))


// connect mongodb
require('./config/connectDB')

// index
const indexRoute = require('./routes/indexRoute')
app.use('/', indexRoute)

// product
const productRoute = require('./routes/productRoute')
app.use('/products', productRoute)

// user
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

// auth
const authRoute = require('./routes/authRoute')
app.use('/auth', authRoute)

// account
const accountRoute = require('./routes/accountRoute')
app.use('/user/account', accountRoute)

// cart
const cartRoute = require('./routes/cartRoute')
app.use('/cart', cartRoute)

// checkout
const checkoutRoute = require('./routes/checkoutRoute')
app.use('/checkout', checkoutRoute)

// admin
const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute)

// Products detail
// const catalogsRoute = require('./routes/catalogsRoute')
// app.use('/catalogs', catalogsRoute)

// // detail product
// app.get('/products/123', (req, res) => {
// 	// console.log(req.query)
// 	res.render('pages/detail-product')
// })

// Not found
app.use((req, res) => res.render('pages/notfound'))

// listening
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log('Listening...')
})
