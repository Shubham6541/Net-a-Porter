const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema(
    {
        name: { type: String, required: true },
        url: { type: String, required: true },
        brand: {
                name:{type: String, required: true}
            },
        stock: {
            available: { type: Boolean, required: true}
        },
        created_at: {
            $date:{ type: Date, required: true}
        }
    },
    { strict: false},
);

module.exports = mongoose.model('item', Item)
