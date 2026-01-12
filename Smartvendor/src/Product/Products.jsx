import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://smart-backends.onrender.com/api/portal/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="products-page">
      <h2>Approved Products</h2>

      <div className="products-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.productName}</h3>
            <p><b>Category:</b> {p.category}</p>
            <p><b>Quantity:</b> {p.quantity}</p>
            <p><b>Price:</b> ₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
