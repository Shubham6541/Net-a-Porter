const Request = require("request");
const ndJsonParser = require('ndjson-parse');
const jsonToMongo = require('json2mongo');
const Product = require('./models/product');


const extracted = async (parsedNdJson, i) => {
        // delete parsedNdjson[j]['_id'];
        console.log(jsonToMongo(parsedNdJson[i]));
        let post = await new Product(parsedNdJson[i]);
        console.log(".........",post);
        await post.save().then(createdPost => {
            console.log("post successfully saved");
        });
};
const loadData = async function(req,res) {
    console.log("Performing insertion");
    // await Product.deleteMany({},console.log("Deleted Successfully"));
    console.log(".......");
    const loading = Promise.resolve(Request.get("https://greendeck-datasets-2.s3.amazonaws.com/netaporter_gb_similar.json", async (error, response, body) => {
        if (error) {
            return console.log(error);
        }
        let parsedNdJson = await ndJsonParser(body);
        console.log("...........",parsedNdJson.length);
        for (let i = 0; i < parsedNdJson.length; i++) {
            console.log(">>>>>>>>>", i);
            await extracted(parsedNdJson, i);
        }
    }));
    loading.then(res.send("updating database"));
};

module.exports = loadData;
