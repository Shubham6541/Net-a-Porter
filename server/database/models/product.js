const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
    {
        name: {type: String, required: true},
        sku: {type: String, required: true},
        url: {type: String, required: true},
        brand: {name: {type: String}, sub_brand: {type: String}},
        stock: {available: {type: Boolean}},
        media: {
            standard: [{
                order: {type: Number, minimum: 0},
                url: {type: String}
            }],
            thumbnail: [{
                order: {type: Number, minimum: 0},
                url: {type: String}
            }]
        },
        description_text: {type: String},
        meta: {
            breadcrumbs: {
                1: {type: String},
                2: {type: String},
                3: {type: String}
            },
            bert_original_classification: {
                l1: {type: String},
                l2: {type: String},
                l3: {type: String},
                l4: {type: String}
            },
            reference: {type: String}
        },
        price: {
            offer_price: {
                currency: {type: String},
                value: {type: Number}
            },
            regular_price: {
                currency: {type: String},
                value: {type: Number}
            },
            basket_price: {
                value: {type: Number},
                currency: {type: String}
            }
        },
        classification: {
            l1: {type: String},
            l2: {type: String},
            l3: {type: String},
            l4: {type: String}
        },
        created_at: {
            type: Date
        },
        updated_at: {
            type: Date
        },
    },
    {strict: false},
);

module.exports = mongoose.model('product', Product)
