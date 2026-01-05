import { Routes, Route } from "react-router-dom";
import Portal from "./Portal/Portal";
import Login from "./VendorLogin/Login";           // Vendor login
import AdminLogin from "./Admin/AdminLogin"; // NEW
import VendorDashboard from "./VendorDashboard/VendorDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import Register from "./Register/Register";
import Products from "./Product/Products";  

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portal />} />

      {/* Vendor */}
      <Route path="/login" element={<Login />} />
      <Route path="/vendor/dashboard" element={<VendorDashboard />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/products" element={<Products />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
