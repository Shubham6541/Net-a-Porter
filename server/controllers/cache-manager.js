const flatCache = require('flat-cache');
const path = require('path');
const cache = flatCache.load('productsCache', path.resolve('../cache'));
const Product = require('../database/models/product');
const responseData = require('./product-controller');

function clearCache() {
    flatCache.clearAll();
};

function fillCache() {
    Product.find().then(items => {
        let data = [];
        items.map(item => data.push(responseData(item)));
        cache.setKey('__express__[]', data);
        cache.save();
    })
};

setInterval(async () => {
    await clearCache();
    await fillCache();
}, 360000);
