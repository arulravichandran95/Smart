import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios"; import "./Login.css"; 
export default function Login() { 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); const navigate = useNavigate(); 
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      { username, password }
    );

    const role = response.data.role;

    // 🔐 STORE LOGIN DATA
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
   
    if (role === "ROLE_ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "ROLE_VENDOR") {
      navigate("/vendor/dashboard");
    }

  } catch (error) {
    alert("Invalid username or password");
  }
};
 
        return ( 
        <div className="login-container"> 
        <form onSubmit={handleLogin} className="login-box"> 
          <h2>Login</h2> 
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /> 
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /> 
          <button type="submit">Login</button> 
          <p style={{ marginTop: "15px" }}>New user? <a href="/register">Register here</a></p>
          </form> </div> 
          ); 
          }