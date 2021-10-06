const indexRoute = require('express').Router();
const slides = require('../public/data/sliderData');
const cards = require('../public/data/cardData');
const hotProducts = require('../public/data/hotProduct');
const products = require('../public/data/products');
const newProducts = require('../public/data/newProduct');
const router = require('./userRoute');
const path = require('path');

indexRoute.get('/', (req, res) => {
    res.render('pages/home', {
        slides: slides,
        cards: cards,
        hotProducts: hotProducts,
        newProducts: newProducts,
        products: products
    });
})

//exports
module.exports = indexRoute;