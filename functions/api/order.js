import { connectDB } from "../db/cloudflare.db.js";
import { OrderService } from "../../server/services/orderService.js";
import { createResult } from "../../server/utils/utills.js";

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });
}

export async function onRequest(context) {
  try {
    await connectDB(context.env.MONGO_URI);

    const url = new URL(context.request.url);
    const method = context.request.method;

    // PLACE ORDER
    if (method === "POST" && url.pathname.endsWith("/place-order")) {
      const body = await context.request.json();
      const order = await OrderService.placeOrder(body);

      return json(
        200,
        createResult("Order placed successfully", order)
      );
    }

    // GET ORDERS
    if (method === "GET" && url.pathname.endsWith("/get-orders")) {
      const orders = await OrderService.getOrders();

      return json(
        200,
        createResult("Orders fetched successfully", orders)
      );
    }

    return new Response("Not Found", { status: 404 });
  } catch (err) {
    return json(400, createResult(null, null, err.message));
  }
}
