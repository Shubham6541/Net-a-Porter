const express = require('express');
const output = require('../controllers/product');
const LoadData = require('../database/loadData');
const router = express.Router();

router.post('/products',output.flatCacheMiddleware,output.getOutput);
router.post('/insert',LoadData);


module.exports = router;