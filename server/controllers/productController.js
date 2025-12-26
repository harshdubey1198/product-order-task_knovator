const ProductService = require("../services/productService");
const { createResult } = require("../utils/utills");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const productController = {};

productController.getProducts = async (req, res) => {
  try {
    const { search, page, limit } = req.query;

    const result = await ProductService.getProducts({
      search,
      page,
      limit,
    });

    return res
      .status(200)
      .json(createResult("Products fetched successfully", result));
  } catch (error) {
    return res
      .status(400)
      .json(createResult(null, null, error.message));
  }
};

productController.getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json(createResult(null, null, "Product not found"));
    }

    return res
      .status(200)
      .json(createResult("Product fetched successfully", product));
  } catch (error) {
    return res
      .status(400)
      .json(createResult(null, null, error.message));
  }
};

productController.createProduct = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploaded.secure_url;
    }

    const product = await ProductService.createProduct({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: imageUrl,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      updateData.image = uploaded.secure_url;
    }

    const product = await ProductService.updateProduct(
      req.params.id,
      updateData
    );

    res.json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

productController.deleteProduct = async (req, res) => {
  try {
    const product = await ProductService.deleteProduct(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json(createResult(null, null, "Product not found"));
    }

    return res
      .status(200)
      .json(createResult("Product deleted successfully", product));
  } catch (error) {
    return res
      .status(400)
      .json(createResult(null, null, error.message));
  }
};

module.exports = productController;
