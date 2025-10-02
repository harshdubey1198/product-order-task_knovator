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

module.exports = productController;
