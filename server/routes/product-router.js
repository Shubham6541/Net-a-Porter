const express = require('express');
const output = require('../controllers/product');

const router = express.Router();

router.post('/products',output.flatCacheMiddleware,output.getOutput);

module.exports = router;