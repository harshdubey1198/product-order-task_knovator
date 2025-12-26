// services/productService.js
const Product = require("../models/product.schema");

const ProductService = {};

/**
 * Get products (exclude soft-deleted)
 */
ProductService.getProducts = async (params = {}) => {
  let {
    search = "",
    page = 1,
    limit = process.env.DEFAULT_PAGE_LIMIT || 10,
  } = params;

  page = Number(page);
  limit = Number(limit);

  const query = {
    deletedAt: null,
  };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const [products, totalCount] = await Promise.all([
    Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  return {
    data: products,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    nextPage: page * limit < totalCount ? page + 1 : null,
    previousPage: page > 1 ? page - 1 : null,
  };
};


ProductService.getProductById = async (id) => {
  return Product.findOne({ _id: id, deletedAt: null });
};

ProductService.createProduct = async (data) => {
  const product = new Product(data);
  await product.save();
  return product;
};

ProductService.updateProduct = async (id, data) => {
  return Product.findOneAndUpdate(
    { _id: id, deletedAt: null },
    data,
    { new: true }
  );
};

/**
 * SOFT DELETE
 */
ProductService.deleteProduct = async (id) => {
  return Product.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() },
    { new: true }
  );
};

module.exports = ProductService;
