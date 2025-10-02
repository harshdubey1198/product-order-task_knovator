const ProductService = require('../services/productService');
const { createResult } = require('../utils/utills');

const productController = {};

productController.getProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        return res.status(200).json(createResult("Products fetched successfully", products));
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

productController.createProduct = async (req, res) => {
    try {
        const product = await ProductService.createProduct(req.body);
        return res.status(201).json(createResult("Product created successfully", product));
    } catch (error) {
        console.error("Error creating product:", error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = productController;
