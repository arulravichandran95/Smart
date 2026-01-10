import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../VendorLogin/Login.css"; // reuse same styling

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      const { token, role } = res.data;

      if (role !== "ROLE_ADMIN") {
        alert("Access denied. Admin only.");
        return;
      }

      // ✅ STORE JWT (NOT PASSWORD)
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate("/admin/dashboard");

    } catch (err) {
      alert("Invalid admin credentials");
      console.error(err);
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
