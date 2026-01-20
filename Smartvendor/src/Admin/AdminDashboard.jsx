import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

import api from "../api/axiosConfig";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingList, setPendingList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

  /* ===== ACTIONS ===== */
  const approveRequest = async (id) => {
    await api.put(`/api/admin/approve/${id}`);
    fetchPending();
    fetchApproved();
  };

  const rejectRequest = async (id) => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason");
      return;
    }

    await api.put(
      `/api/admin/reject/${id}`,
      rejectReason,
      { headers: { "Content-Type": "text/plain" } }
    );

    setRejectingId(null);
    setRejectReason("");
    fetchPending();
    fetchApproved();
  };

  /* ===== FETCH DATA ===== */
  const fetchPending = async () => {
    const res = await api.get("/api/admin/pending");
    setPendingList(res.data);
  };

  const fetchApproved = async () => {
    const res = await api.get("/api/admin/approved");
    setApprovedList(res.data);
  };

  useEffect(() => {
    if (activeTab === "pending") fetchPending();
    if (activeTab === "approved") fetchApproved();
  }, [activeTab]);

  return (
    <div className="admin-layout">
      {/* ===== SIDEBAR ===== */}
      <div className="admin-sidebar">
        <h2 className="admin-title">Admin</h2>

        <button
          className={`admin-btn pending ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Requests
        </button>

        <button
          className={`admin-btn approved ${activeTab === "approved" ? "active" : ""}`}
          onClick={() => setActiveTab("approved")}
        >
          Approved Requests
        </button>

        <button
          className="admin-btn logout-btn"
          onClick={handleLogout}
          style={{ marginTop: "auto", backgroundColor: "#ff4d4d" }}
        >
          Logout
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="admin-content">
        {activeTab === "pending" && (
          <>
            <h2 className="section-title pending-text">Pending Requests</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map(item => (
                  <tr key={item.id}>
                    <td>{item.vendorUsername}</td>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td><span className="badge pending">PENDING</span></td>
                    <td>
                      <button className="action-btn approve" onClick={() => approveRequest(item.id)}>Approve</button>
                      <button className="action-btn reject" onClick={() => setRejectingId(item.id)}>Reject</button>

                      {rejectingId === item.id && (
                        <div className="reject-box">
                          <input
                            type="text"
                            placeholder="Rejection reason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                          />
                          <button onClick={() => rejectRequest(item.id)}>Confirm</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "approved" && (
          <>
            <h2 className="section-title approved-text">Approved Requests</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedList.map(item => (
                  <tr key={item.id}>
                    <td>{item.vendorUsername}</td>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td><span className="badge approved">APPROVED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
