const path = require('path');
const flatCache = require('flat-cache')
const product = require('../database/models/product');
const QueryGenerate = require('./filterProcessing');

let cache = flatCache.load('productsCache', path.resolve('../cache'));

const responseData = (product) => {
    return {
        name: product["name"],
        brand: {name: product.brand.name},
        media: {standard: [{order: 1, url: product.media.standard[0].url}]}
    }
};

let flatCacheMiddleware = (req, res, next) => {
    let key = '__express1__' + JSON.stringify(req.body.filters)
    console.log(key);
    let cacheContent = cache.getKey(key);
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


let getOutput = function (req, res) {
    const filters = req.body.filters;
    const query = Promise.resolve(QueryGenerate(filters));
    query.then((value) => product.find(value, (err, Products) => {
        if (err) {
            return res.status(400).json({success: false, error: err});
        }
        if (!Products.length) {
            return res.status(400).json({success: false, error: 'No matching product'});
        }
        let data = [];
        Products.map(product => data.push(responseData(product)));
        return res.status(200).json({success: true, data: data});
    }).catch(err => console.log(err)));
};


module.exports = {flatCacheMiddleware, getOutput};
