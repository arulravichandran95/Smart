import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function SidebarLayout({ role, children }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">Smart Procurement</h2>

        {role === "ADMIN" && (
          <nav>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/vendors">Manage Vendors</Link>
            <Link to="/admin/requests">Procurement Requests</Link>
            <Link to="/admin/reports">Reports</Link>
          </nav>
        )}

        {role === "VENDOR" && (
          <nav>
            <Link to="/vendor/dashboard">Dashboard</Link>
            <Link to="/vendor/request">New Request</Link>
            <Link to="/vendor/status">Request Status</Link>
            <Link to="/vendor/profile">Profile</Link>
          </nav>
        )}
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
