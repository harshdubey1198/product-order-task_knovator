import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import CartPage from "./Pages/CartPage";
import Header from "./Components/Header";
import MyOrders from "./Components/MyOrders";
import NotFound from "./Pages/NotFound";
import ProductCrud from "./Pages/Admin/Products/ProductCrud";
import GoogleAd from "./Components/Ads/GoogleAd";

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
            <Route path="/admin/products" element={<ProductCrud />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      {/* Google Ad below Header */}
      <div className="container my-3">
        <GoogleAd slot="1234567890" style={{ width: "100%", height: 90 }} />
      </div>
      </main>
    </>
  );
}
