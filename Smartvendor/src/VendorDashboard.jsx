import { useState } from "react";
import axios from "axios";
import "./VendorDashboard.css";

export default function VendorDashboard() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // 🔐 GET STORED LOGIN DETAILS
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Session expired. Please login again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/vendor/submit",
        {
          productName,
          category,
          quantity,
          price
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
      );

      alert("Procurement Request Submitted Successfully!");

      // Clear form
      setProductName("");
      setCategory("");
      setQuantity("");
      setPrice("");

    } catch (error) {
      console.error(error);
      alert("Submission failed!");
    }
  };

  return (
    <div className="vendor-container">
      <form onSubmit={handleSubmit} className="vendor-form">
        <h2 className="vendor-title">Vendor Dashboard</h2>

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

        <button className="vendor-btn" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}
