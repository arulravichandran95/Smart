import { useState, useEffect } from "react";
import axios from "axios";
import "./VendorDashboard.css";

const api = axios.create({
  baseURL: "https:smart-backends.onrender.com",
});

// 🔐 Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("submit");

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [statusList, setStatusList] = useState([]);
  const [historyList, setHistoryList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      productName,
      category,
      quantity: Number(quantity),
      price: Number(price),
    };

    setIsSubmitting(true);

    try {
      if (editingId) {
        await api.put(`/api/vendor/update/${editingId}`, payload);
        alert("Updated successfully");
      } else {
        await api.post("/api/vendor/submit", payload);
        alert("Submitted successfully");
      }

      resetForm();
      fetchHistory();
    } catch (err) {
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setQuantity("");
    setPrice("");
    setEditingId(null);
  };

  const fetchStatus = async () => {
    const res = await api.get("/api/vendor/status");
    setStatusList(res.data);
  };

  const fetchHistory = async () => {
    const res = await api.get("/api/vendor/history");
    setHistoryList(res.data);
  };

  const handleEdit = (item) => {
    setProductName(item.productName);
    setCategory(item.category);
    setQuantity(item.quantity);
    setPrice(item.price);
    setEditingId(item.id);
    setActiveTab("submit");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this submission?")) return;
    await api.delete(`/api/vendor/delete/${id}`);
    fetchHistory();
  };

  useEffect(() => {
    if (activeTab === "status") fetchStatus();
    if (activeTab === "history") fetchHistory();
  }, [activeTab]);

  return (
    <div className="vendor-layout">
      {/* ===== SIDEBAR ===== */}
      <div className="vendor-sidebar">
        <h2 className="sidebar-title">Vendor</h2>

        <button
          className={`sidebar-btn ${activeTab === "submit" ? "active" : ""}`}
          onClick={() => setActiveTab("submit")}
        >
          Product Submission
        </button>

        <button
          className={`sidebar-btn ${activeTab === "status" ? "active" : ""}`}
          onClick={() => setActiveTab("status")}
        >
          Status
        </button>

        <button
          className={`sidebar-btn ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          My Submissions
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="vendor-content">
        {activeTab === "submit" && (
          <form onSubmit={handleSubmit} className="vendor-form">
            <h2 className="vendor-title">
              {editingId ? "Edit Submission" : "Product Submission"}
            </h2>

            <p className="vendor-description">
              Auto-approved if Quantity ≥ 3 and Price ≤ 30000
            </p>

            <input
              className="vendor-input"
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <input
              className="vendor-input"
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <input
              className="vendor-input"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <input
              className="vendor-input"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <button className="vendor-btn" disabled={isSubmitting}>
              {editingId ? "Update" : "Submit"}
            </button>
          </form>
        )}

        {activeTab === "status" && (
          <div className="status-box">
            <h2>Product Status</h2>
            <table className="status-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {statusList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <span className={`status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.rejectionReason || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "history" && (
          <div className="status-box">
            <h2>My Submissions</h2>
            <table className="status-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {historyList.length === 0 ? (
                  <tr>
                    <td colSpan="7">No submissions available</td>
                  </tr>
                ) : (
                  historyList.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.status}</td>
                      <td>
                        {item.status === "PENDING" && (
                          <button onClick={() => handleEdit(item)}>Edit</button>
                        )}
                      </td>
                      <td>
                        {item.status === "PENDING" && (
                          <button onClick={() => handleDelete(item.id)}>
                            🗑
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
