const indexRoute = require('express').Router();
const slides = require('../public/data/sliderData');
const cards = require('../public/data/cardData');
const products = require('../public/data/products');

const arr = Array.from(Array(products.length).keys());

var hotIndexes = getRandom(arr, 4);
var newIndexes = getRandom(arr, 8);
var popularIndexes = getRandom(arr, 16);

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

indexRoute.get('/', (req, res) => {
    res.render('pages/home', {
        slides,
        cards,
        hotIndexes,
        newIndexes,
        popularIndexes,
        products
    });
})

//exports
module.exports = indexRoute;