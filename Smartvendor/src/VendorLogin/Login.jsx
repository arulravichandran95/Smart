import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      const { token, role } = response.data;

      // 🔐 Store login data
      if (token) {
        localStorage.setItem("token", token);
      }
      localStorage.setItem("role", role);

      // 🔁 Redirect based on role
      if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "ROLE_VENDOR") {
        navigate("/vendor/dashboard");
      } else {
        alert("Unknown role");
      }

    } catch (error) {
      alert("Invalid username or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      {/* 🎥 Background Video */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/admin-bg.mp4" type="video/mp4" />
      </video>

      {/* 🔐 Login Form */}
      <form onSubmit={handleLogin} className="login-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px" }}>
          New user? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
}
