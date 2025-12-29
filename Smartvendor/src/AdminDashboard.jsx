import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingList, setPendingList] = useState([]);
  const [approvedList, setApprovedList] = useState([]);
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");


  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const approveRequest = async (id) => {
  await axios.put(
    `http://localhost:8080/api/admin/approve/${id}`,
    {},
    { auth: { username, password } }
  );
  fetchPending();
  fetchApproved();
};

const rejectRequest = async (id) => {
  if (!rejectReason.trim()) {
    alert("Please enter rejection reason");
    return;
  }

  await axios.put(
    `http://localhost:8080/api/admin/reject/${id}`,
    rejectReason,
    {
      auth: { username, password },
      headers: { "Content-Type": "text/plain" }
    }
  );

  setRejectingId(null);
  setRejectReason("");
  fetchPending();
  fetchApproved();
};


  /* ===== FETCH DATA ===== */
  const fetchPending = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/admin/pending",
      { auth: { username, password } }
    );
    setPendingList(res.data);
  };

  const fetchApproved = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/admin/approved",
      { auth: { username, password } }
    );
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
      </div>

      {/* ===== CONTENT ===== */}
      <div className="admin-content">

        {/* ===== PENDING ===== */}
        {activeTab === "pending" && (
          <>
            <h2 className="section-title pending-text">Pending Requests</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vendor Username</th>
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
                    <td>
                      <span className="badge pending">PENDING</span>
                    </td>
                    <td>
                      <button className="action-btn approve"onClick={() => approveRequest(item.id)} >Approve</button>

                     <button className="action-btn reject"onClick={() => setRejectingId(item.id)}>Reject</button>
                      {rejectingId === item.id && (
                       <div className="reject-box">
                      <input type="text"
                          placeholder="Rejection reason"
                          value={rejectReason}
                           onChange={(e) => setRejectReason(e.target.value)} />
                       <button className="confirm-btn" onClick={() => rejectRequest(item.id)}>Confirm</button>
                       </div>)}
                       </td>
                       <td>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ===== APPROVED ===== */}
        {activeTab === "approved" && (
          <>
            <h2 className="section-title approved-text">Approved Requests</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Vendor Username</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                    <td>
  <button
    className="action-btn reject"
    onClick={() => setRejectingId(item.id)}
  >
    Reject
  </button>

  {rejectingId === item.id && (
    <div className="reject-box">
      <input
        type="text"
        placeholder="Rejection reason"
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
      />
      <button onClick={() => rejectRequest(item.id)}>
        Confirm
      </button>
    </div>
  )}
</td>

      
                    <td>
                      <span className="badge approved">APPROVED</span>
                    </td>
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
