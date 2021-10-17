require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// add middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// setup view
app.set("view engine", "ejs");
app.set("views", "views");

// setup public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// connect to database
async function connectDB() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k7qck.mongodb.net/k14shop?retryWrites=true&w=majority`
  );
}
connectDB();


// setup router
const indexRoute = require("./routes/indexRoute");
app.use("/", indexRoute);



// product
const productRoute = require('./routes/productRoute')
app.use('/products', productRoute)



// user
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

//account
const accountRoute = require('./routes/accountRoute');
app.use('/user/account', accountRoute)

// cart
const cartRoute = require('./routes/cartRoute')
app.use('/carts', cartRoute)

// checkout
const checkoutRoute = require('./routes/checkoutRoute')
app.use('/checkout', checkoutRoute)

// admin
const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

// Products detail
const catalogsRoute = require("./routes/catalogsRoute");
app.use("/catalogs", catalogsRoute);



// test server
app.get("/test", (req, res) => {
  res.json("Test thanh cong");
});



// detail product
app.get('/products/123', (req, res) => {
  res.render('pages/detail-product')
})



// Not found
app.use((req, res) => res.render('pages/notfound'))


// listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening...");
});