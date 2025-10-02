const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/products', productController.getProducts);

module.exports = router;
