import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../VendorLogin/Login.css";   // reuse same styling

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      const role = response.data.role;

      if (role !== "ROLE_ADMIN") {
        alert("Access denied. Admin only.");
        return;
      }

      // store credentials
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      navigate("/admin/dashboard");

    } catch (error) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="login-container">
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/admin-bg.mp4" type="video/mp4" />
      </video>

      <form onSubmit={handleLogin} className="login-box">
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
