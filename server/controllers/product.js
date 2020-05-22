const path = require('path');
const flatCache = require('flat-cache')
const product = require('../database/models/product');
const QueryGenerate = require('./filterProcessing');

let cache = flatCache.load('productsCache', path.resolve('../cache'));




let getOutput = function (req, res) {
    const filters = req.body.filters;
    const query = Promise.resolve(QueryGenerate(filters));
    query.then((value)=>console.log(value));
    query.then((value) => product.find(value, (err, Products) => {
        if (err) {
            return res.status(400).json({success: false, error: err});
        }
        if (!Products.length) {
            return res.status(400).json({success: false, error: 'No matching product'});
        }
        return res.status(200).json({success: true, data: Products});
    }).catch(err => console.log(err)));
};

module.exports = { getOutput};