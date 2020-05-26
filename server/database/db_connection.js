const mongoose = require("mongoose");
const {DATABASE_URL} = require('./../config');
mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const database = mongoose.connection;
module.exports = database;
