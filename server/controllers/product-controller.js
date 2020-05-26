const path = require('path');
const flatCache = require('flat-cache')
const product = require('../database/models/product');
const GenerateQuery = require('./processFIlters');
const cache = flatCache.load('productsCache', path.resolve('../cache'));

//type of response which client will receive, pruning of extra data from the response to reduce the data size
module.exports = responseData = (product) => {
    return {
        name: product["name"],
        brand: {name: product.brand.name},
        created_at: product.created_at,
        stock: {available: product.stock.available},
        price: product.price,
        description_text: product.description_text,
        media: {standard: [{order: 1, url: product.media.standard[0].url}]}
    }
};

//caching data for faster response
const cacheMiddleware = (req, res, next) => {
    const key = '__express__' + JSON.stringify(req.body.filters)
    const cacheContent = cache.getKey(key);
    if (cacheContent) {
        res.status(200).json(cacheContent);
    } else {
        res.sendResponse = res.status(200).json;
        res.status(200).json = (body) => {
            cache.setKey(key, body);
            cache.save();
            res.sendResponse(body)
        };
        next()
    }
};

//process filters and get data from the database accordingly
const getProductList = function (req, res) {
    const filters = req.body.filters || [];
    const query = Promise.resolve(GenerateQuery(filters));
    query.then((value) => product.find(value, (err, Products) => {
        if (err) {
            return res.status(400).json({success: false, error: err});
        }
        if (!Products.length) {
            return res.status(400).json({success: false, error: 'No matching product'});
        }
        //filtering the data and then saving it
        let data = [];
        Products.map(product => data.push(responseData(product)));
        return res.status(200).json({success: true, data: data});
    }).catch(err => console.log(err)));
};


module.exports = {
    cacheMiddleware: cacheMiddleware,
    getProductList: getProductList
};
