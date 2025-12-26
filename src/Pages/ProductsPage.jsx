import React, { useEffect, useState } from "react";
import { getProducts } from "../apiServices/service";
import ProductCard from "../Components/ProductCard";
import { useCart } from "../context/CardContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProducts();
      // server createResult returns { message, data, error }
      const data = res?.data?.data || [];
      setProducts(data);
      console.log(data); 
      
      if (data.length === 0) {
        setError("No products available.");
      }
    } catch (err) {
      setError(err?.error || err?.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Products</h2>
        <small className="text-muted">{products.length} items</small>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
        </div>
      )}

      {error && !loading && (
        <div className="alert alert-warning">{error}</div>
      )}

      {!loading && !error && (
        <div className="row g-3">
          {products.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p._id || p.id || p.name}>
              <ProductCard product={p} onAdd={(prod) => addToCart(prod, 1)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
