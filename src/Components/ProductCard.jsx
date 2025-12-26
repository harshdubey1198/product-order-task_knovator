import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card h-100 card-product">
      <img
        src={product.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`}
        className="card-img-top product-img"
        alt={product.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small">{product.description}</p>
        <div className="mt-auto d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <div className="h6 mb-0">₹{product.price?.toFixed(2)}</div>
          </div>
          <button className="btn btn-sm btn-primary" onClick={() => onAdd(product)}>
            <i className="bi bi-plus-lg me-1"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
