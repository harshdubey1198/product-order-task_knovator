import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../Components/CartItem";
import { useCart } from "../context/CardContext";
import { placeOrder } from "../apiServices/service";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const validate = () => {
    if (!firstName.trim() || !lastName.trim() || !address.trim()) {
      setAlert({ type: "danger", text: "Please fill all required fields." });
      return false;
    }
    if (cartItems.length === 0) {
      setAlert({ type: "danger", text: "Cart is empty." });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    setAlert(null);
    if (!validate()) return;

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      items: cartItems.map((it) => ({
        product: it._id,      
        quantity: it.quantity 
      }))
    };


    setLoading(true);
    try {
      const res = await placeOrder(payload);
      // server returns createResult { message, data, error }
      if (res?.message) {
        setAlert({ type: "success", text: res.message });
        clearCart();
        // after short delay, navigate to home
        setTimeout(() => {
          navigate("/");
        }, 1100);
      } else if (res?.error) {
        setAlert({ type: "danger", text: res.error });
      } else {
        setAlert({ type: "success", text: "Order placed successfully." });
        clearCart();
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      setAlert({ type: "danger", text: err?.error || err?.message || "Failed to place order" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Your Cart</h2>
        <small className="text-muted">{cartItems.length} product(s)</small>
      </div>

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
          {alert.text}
          <button type="button" className="btn-close" onClick={() => setAlert(null)} aria-label="Close"></button>
        </div>
      )}

      <div className="row g-4">
        <div className="col-md-7">
          <div className="bg-white p-3 shadow-sm rounded">
            {cartItems.length === 0 && <div className="text-center py-5 text-muted">Your cart is empty.</div>}
            {cartItems.map((item) => (
              <CartItem
                key={item._id || item.id || item.name}
                item={item}
                onRemove={removeFromCart}
                onUpdate={updateQuantity}
              />
            ))}
          </div>
        </div>

        <div className="col-md-5">
          <div className="bg-white p-4 shadow-sm rounded">
            <h5>Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <div>Subtotal</div>
              <div>₹{subtotal.toFixed(2)}</div>
            </div>

            <hr />

            <h6 className="mb-2">Customer Details</h6>
            <div className="mb-2">
              <label className="form-label">First name <span className="text-danger">*</span></label>
              <input className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="mb-2">
              <label className="form-label">Last name <span className="text-danger">*</span></label>
              <input className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Address <span className="text-danger">*</span></label>
              <textarea className="form-control" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <button className="btn btn-success w-100" disabled={loading} onClick={handlePlaceOrder}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" /> Placing Order...
                </>
              ) : (
                <>Place Order</>
              )}
            </button>
          </div>

          <div className="mt-3 text-center">
            <button className="btn btn-outline-secondary me-2" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
