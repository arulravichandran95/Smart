import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  const fetchApprovedRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/approved-requests"
      );
      setRequests(response.data);
    } catch (error) {
      alert("Failed to load approved requests");
    }
  };

  return (
    <div className="admin-container">
      <h2>Approved Procurement Requests</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Vendor</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No approved requests found
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{req.productName}</td>
                <td>{req.category}</td>
                <td>{req.quantity}</td>
                <td>₹ {req.price}</td>
                <td>{req.vendorName}</td>
                <td className="approved">APPROVED</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
