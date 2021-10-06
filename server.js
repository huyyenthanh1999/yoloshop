require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

// add middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())



// setup view
app.set('view engine', 'ejs')
app.set('views', 'views')



// setup public folder
app.use("/public", express.static(path.join(__dirname, 'public')));




// connect to database
async function connectDB() {
    // await mongoose.connect(
    //     `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k7qck.mongodb.net/k14shop?retryWrites=true&w=majority`
    // )
    await mongoose.connect('mongodb://localhost:27017/k14shop');
}
connectDB()



// setup router
const indexRoute = require('./routes/indexRoute');
app.use('/', indexRoute)


// setup router
// product
// const productRoute = require('./routes/productRoute')
// app.use('/products', productRoute)


// auth
// ...



// user
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)



// admin
app.get('/admin', (req, res) => {
    res.render('pages/admin')
})



// test server
app.get('/test', (req, res) => {
    res.json('Test thanh cong')
})

// listening
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Listening...')
})
