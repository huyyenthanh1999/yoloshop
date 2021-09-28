const indexRoute = require('express').Router();
const slides = require('../public/data/sliderData');
const cards = require('../public/data/cardData');
const hotProducts = require('../public/data/hotProduct');
const products = require('../public/data/products');

indexRoute.get('/', (req, res) => {
    res.render('pages/home', {
        slides: slides,
        cards: cards,
        hotProducts: hotProducts,
        products: products
    });
})

//exports
module.exports = indexRoute;