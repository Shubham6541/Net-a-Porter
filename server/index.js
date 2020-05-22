const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;
const Stream = require('stream').Stream;

const database = require('./database/db_connection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const productRouter = require('./routes/product-router');


database.on('error', console.error.bind(console, 'MongoDB connection error:'));
async function fillDb(){
    const options = {
        method: 'GET',
        uri:'https://greendeck-datasets-2.s3.amazonaws.com/netaporter_gb_similar.json'
    };

}


logger = console.log

app.get('/',(req, res) => {
            res.contentType('json');
            let format = new ArrayFormatter;
            // product.find({
            //         'stock.available': { '$eq': true },
            //         created_at: { '$gte': new Date('2010-04-09T18:30:00.000Z\n'), '$lte': new Date('20 April, 2020') },
            //         'brand.name': { '$regex': 'nike' },
            //         'price.offer_price.value': { '$gt': 10 }
            //     }
            // ).stream().pipe(formast);
            // format.pipe(res);
});

function ArrayFormatter () {
    Stream.call(this);
    this.writable = true;
    this._done = false;
}

ArrayFormatter.prototype.__proto__ = Stream.prototype;

ArrayFormatter.prototype.write = function (doc) {
    if (! this._hasWritten) {
        this._hasWritten = true;

        // open an object literal / array string along with the doc
        this.emit('data', '{ "results": [' + JSON.stringify(doc) );

    } else {
        this.emit('data', ',' + JSON.stringify(doc));
    }

    return true;
}

ArrayFormatter.prototype.end =
    ArrayFormatter.prototype.destroy = function () {
        if (this._done) return;
        this._done = true;

        this.emit('data', ']}');
        this.emit('end');
    };
app.use('/api',productRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
