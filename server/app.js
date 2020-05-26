const {PORT} = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const database = require('./database/db_connection');
const productRouter = require('./routes/product-router');
const cacheManager = require('./controllers/cache-manager');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', productRouter);

app.get('/', (req, res) => {
    res.send("Welcome to NPA store");
});

//Starting the server
database.then(() =>
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    )).catch(err => {
    console.log(err);
});
