import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // reuse same styling

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("VENDOR");

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("handleRegister called", { username, password, role });
    setIsSubmitting(true);

    try {
      const resp = await api.post("/api/auth/register", {
        username,
        password,
        role,
      });

      console.log("register response:", resp);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      console.error("register error:", error);
      if (error.response) {
        alert("Registration failed: " + (error.response.data?.message || error.response.status));
      } else {
        alert("Registration failed: " + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleRegister}>
        <h2>Register</h2>

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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
