import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import VendorDashboard from "./VendorDashboard";
import Register from "./Register";


function App() {
  return (
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/vendor/dashboard" element={<VendorDashboard />} />
</Routes>

  );
}

export default App;
