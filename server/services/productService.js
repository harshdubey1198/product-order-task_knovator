const Product = require('../models/product.schema');

const ProductService = {};

ProductService.getAllProducts = async () => {
    const products = await Product.find({});
    return products;
};

ProductService.createProduct = async (data) => {
    const product = new Product(data);
    await product.save();
    return product;
};

module.exports = ProductService;
