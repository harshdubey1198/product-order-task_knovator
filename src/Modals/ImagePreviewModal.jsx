// Modals/ImagePreviewModal.jsx
import React from "react";

function ImagePreviewModal({ show, image, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Image Preview</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            <img
              src={image}
              alt="preview"
              className="img-fluid rounded"
              style={{ maxHeight: "70vh" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePreviewModal;
