// Pages/ProductCrud.jsx
import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../../apiServices/service";
import ProductModal from "../../../Modals/ProductModal";
import ImagePreviewModal from "../../../Modals/ImagePreviewModal";

function ProductCrud() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [previewImage, setPreviewImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ page, limit, search });
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

  const openCreateModal = () => {
    setEditId(null);
    setForm({ name: "", description: "", image: "", price: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditId(product._id);
    setForm(product);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) await updateProduct(editId, form);
    else await createProduct(form);

    setShowModal(false);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Product CRUD</h3>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Add Product
        </button>
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search product..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <table className="table table-bordered align-middle">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                src={p.image}
                alt={p.name}
                style={{
                  width: 45,
                  height: 45,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                className="rounded"
                onClick={() => {
                  setPreviewImage(p.image);
                  setShowPreview(true);
                }}
              />

              </td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => openEditModal(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        editId={editId}
        loading={loading}
      />

      <ImagePreviewModal
        show={showPreview}
        image={previewImage}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}

export default ProductCrud;
