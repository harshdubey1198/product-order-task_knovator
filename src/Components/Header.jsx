import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CardContext";

export default function Header() {
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          E-commerce Store
        </Link>

        {/* Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/orders" ? "active" : ""}`}
                to="/orders"
              >
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`btn btn-outline-primary d-flex align-items-center ${location.pathname === "/cart" ? "active" : ""}`}
                to="/cart"
              >
                <i className="bi bi-cart3 me-2"></i>
                Cart
                <span className="badge bg-primary rounded-pill ms-2 badge-cart">
                  {cartCount}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
