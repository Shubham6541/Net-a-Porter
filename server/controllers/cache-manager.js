const flatCache = require("flat-cache");
const path = require("path");
const cache = flatCache.load("productsCache", path.resolve("./cache"));
const Product = require("../database/models/product");

const responseData = (product) => {
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

function clearCache() {
    flatCache.clearAll();
}

function fillCache() {
    Product.find().then(items => {
        let data = [];
        items.map(item => data.push(responseData(item)));
        cache.setKey("_product_[]", data);
        cache.save();
    })
}

setInterval(async () => {
    await clearCache();
    await fillCache();
}, 720000);
