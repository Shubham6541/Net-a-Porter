const mongoose = require("mongoose");
const connect = mongoose.connect('mongodb://shubham:shubham@green-deck-shard-00-00-3uwoo.mongodb.net:27017,green-deck-shard-00-01-3uwoo.mongodb.net:27017,green-deck-shard-00-02-3uwoo.mongodb.net:27017/test?ssl=true&replicaSet=Green-deck-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const database = mongoose.connection;

module.exports = database;