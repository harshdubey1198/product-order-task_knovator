import Order from "../models/order.schema.js";
import Product from "../models/product.schema.js";

export const OrderService = {};

OrderService.placeOrder = async orderData => {
  const { firstName, lastName, address, items } = orderData;

  if (!firstName || !lastName || !address || !items || items.length === 0) {
    throw new Error("All order details are required and cart cannot be empty.");
  }

  let totalAmount = 0;
  const populatedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) throw new Error(`Product not found: ${item.product}`);

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    populatedItems.push({
      product: product._id,
      quantity: item.quantity
    });
  }

  const newOrder = new Order({
    firstName,
    lastName,
    address,
    items: populatedItems,
    totalAmount
  });

  await newOrder.save();
  return newOrder;
};

OrderService.getOrders = async () =>
  Order.find().populate("items.product");
