const express = require("express");
const ProductController = require("../controllers/product-controller");
const LoadDataToDatabase = require("../database/loadData");
const router = express.Router();

router.post("/products", ProductController.cacheMiddleware, ProductController.getProductList);
router.post("/insert", LoadDataToDatabase);

module.exports = router;
