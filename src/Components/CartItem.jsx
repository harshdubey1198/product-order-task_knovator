import React from "react";

export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className="d-flex gap-3 align-items-center py-2 border-bottom">
      <img
        src={item.image || `https://via.placeholder.com/100?text=${encodeURIComponent(item.name)}`}
        alt={item.name}
        style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6 }}
      />
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <strong>{item.name}</strong>
          <div>₹{(item.price || 0).toFixed(2)}</div>
        </div>
        <div className="d-flex align-items-center gap-2 mt-2">
          <input
            type="number"
            className="form-control form-control-sm"
            style={{ width: 90 }}
            value={item.quantity}
            min={1}
            onChange={(e) => onUpdate(item._id, parseInt(e.target.value || 1))}
          />
          <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(item._id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
