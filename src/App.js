import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import CartPage from "./Pages/CartPage";
import Header from "./Components/Header";
import MyOrders from "./Components/MyOrders";
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <>
      <Header />
      <main className="py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
