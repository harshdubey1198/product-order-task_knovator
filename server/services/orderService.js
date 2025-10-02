const orders = [];

const OrderService = {};

OrderService.placeOrder = async (orderData) => {
    const { firstName, lastName, address, items } = orderData;

    if (!firstName || !lastName || !address || !items || items.length === 0) {
        throw new Error("All order details are required and cart cannot be empty.");
    }

    const newOrder = {
        id: orders.length + 1,
        firstName,
        lastName,
        address,
        items,
        createdAt: new Date()
    };

    orders.push(newOrder);
    console.log("New Order Placed:", newOrder); 
    return newOrder;
};

module.exports = OrderService;
