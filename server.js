// require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// add middleware
app.use(express.json());
app.use(cookieParser())

// setup view
app.set('view engine', 'ejs')
app.set('views', 'views')


// setup public folder
// app.use(express.static('public'))
app.use("/public",express.static(path.join(__dirname, 'public')));




// connect to database
// mongoose.connect(
//     `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k7qck.mongodb.net/k14shop?retryWrites=true&w=majority`
// )


// setup router
const indexRoute = require('./routes/indexRoute');
app.use('/', indexRoute)

// product
// const productRoute = require('../routes/productRoute')
// app.use('/products', productRoute)


// auth
// ...




// user
// ...





// listening
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Listening...')
})