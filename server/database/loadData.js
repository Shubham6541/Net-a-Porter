const Request = require("request");
const ndJsonParser = require('ndjson-parse');
const jsonToMongo = require('json2mongo');
const Product = require('./models/product');
const {LOAD_DATA_URI} = require('./../config');

//creating and saving the database object
const store = async (parsedNdJson, i) => {
    const post = await new Product(jsonToMongo(parsedNdJson[i]));
    await post.save().then(() => {
        console.log("post successfully saved");
    });
};

//Used to load the data into the mongodb database from the DATABASE_URL
const loadData = async function (req, res) {
    //Removing all elements from the database
    await Product.deleteMany({}, console.log("Deleted Successfully"));

    //Getting the data from the url
    const saveData = Promise.resolve(Request.get(LOAD_DATA_URI, async (error, response, body) => {
        if (error) {
            res.send(error);
        }
        //parsing the data from ndJson to json
        const parsedNdJson = await ndJsonParser(body);
        for (let i = 0; i < parsedNdJson.length; i++) {
            await store(parsedNdJson, i);
        }
    }));
    await saveData.then(res.send("updating database"));
};

module.exports = loadData;
