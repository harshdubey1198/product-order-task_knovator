import React, { useEffect, useState } from "react";
import { getOrders } from "../apiServices/service";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getOrders();
      const data = res?.data || [];
      setOrders(data);
      if (data.length === 0) setError("No orders found.");
    } catch (err) {
      setError(err?.error || err?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">My Orders</h2>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
        </div>
      )}

      {error && !loading && <div className="alert alert-warning">{error}</div>}

      {!loading && !error && (
        <div className="list-group">
          {orders.map((order) => (
            <div
              key={order._id}
              className="list-group-item list-group-item-action flex-column align-items-start mb-3"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h5>
                <small className="text-muted">
                  {new Date(order.createdAt).toLocaleString()}
                </small>
              </div>
              <p className="mb-1">
                {order.firstName} {order.lastName} — {order.address}
              </p>
              <ul className="mb-1">
                {order.items.map((it, idx) => (
                  <li key={idx}>
                    {it.product?.name} × {it.quantity} = ₹
                    {(it.product?.price * it.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <strong>Total: ₹{order.totalAmount.toFixed(2)}</strong>
              <div className="mt-2">
                <span className="badge bg-info text-dark">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
