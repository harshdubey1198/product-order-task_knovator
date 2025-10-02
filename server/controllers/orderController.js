const OrderService = require('../services/orderService');
const { createResult } = require('../utils/utills');

const orderController = {};

orderController.placeOrder = async (req, res) => {
    try {
        const order = await OrderService.placeOrder(req.body);
        return res.status(200).json(createResult("Order placed successfully", order));
    } catch (error) {
        console.error("Error placing order:", error.message);
        return res.status(400).json(createResult(null, null, error.message));
    }
};

module.exports = orderController;
