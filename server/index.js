const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;

const database = require('./database/db_connection');
const productRouter = require('./routes/product-router');

database.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(bodyParser.json());

app.use('/api', productRouter);
app.get('/', (req, res) => {
    res.send("Welcome to NPA store");
});

database.then(() =>
    app.listen(apiPort, () =>
        console.log(`Server running on port ${apiPort}`)
    )).catch(err => {
    console.log(err);
});
