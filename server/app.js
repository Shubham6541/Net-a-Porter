const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const database = require("./database/db_connection");
const productRouter = require("./routes/product-router");
require("./controllers/cache-manager");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
app.use("/api", productRouter);

app.get("/", (req, res) => {
    res.send("Welcome to NPA store");
});


// app.use(express.static(path.join(__dirname, '../client/build')));
//
// app.get('/', (req, res) => {
//     res.sendfile(path.join(__dirname = 'client/build/index.html'));
// });
//Starting the server

    app.listen(process.env.PORT ||8080, () =>
        console.log('Server running on port 8080')
    );

