const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        name: { type: String},
        url: { type: String},
        brand: {
                name:{type: String}
            },
        stock: {
            available: { type: Boolean}
        }

    },
    {strict: false},
);

module.exports = mongoose.model('product', Product)
