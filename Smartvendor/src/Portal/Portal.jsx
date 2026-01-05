import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../ChatBot/ChatBot";
import "./Portal.css";

export default function Portal() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  // Prevent background scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = showChat ? "hidden" : "auto";
  }, [showChat]);

  return (
    <div className="portal-container">

      {/* ===== NAVBAR ===== */}
      <header className="portal-header">
        <div className="logo">Smart Procurement</div>

        <nav className="nav-links">
          <span
            className="nav-link"
            onClick={() => navigate("/products")}
          >
            Products
          </span>

          <a href="/" onClick={(e) => e.preventDefault()}>Solutions</a>
          <a href="/" onClick={(e) => e.preventDefault()}>Security</a>
          <a href="/" onClick={(e) => e.preventDefault()}>Resources</a>
          <a href="/" onClick={(e) => e.preventDefault()}>Contact</a>
        </nav>

        <button
          className="nav-btn"
          aria-label="Talk to Procurement Expert"
          onClick={() => setShowChat(true)}
        >
          Any Help!!
        </button>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Effective Procurement Management <br />
            <span>A Key to Operational Excellence</span>
          </h1>

          <div className="hero-description">
            <p>
              Smart Procurement helps organizations control spending,
              standardize vendor workflows, and improve approval efficiency
              using a secure, centralized digital platform.
            </p>
          </div>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              User Login
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/admin/login")}
            >
              Admin Login
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://www.zycus.com/wp-content/uploads/2025/02/Procurement-Apps-Banner-Image.webp"
            alt="Procurement Platform Illustration"
          />
        </div>
      </section>

      {/* ===== CHAT BOT ===== */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}

      {/* ===== FOOTER ===== */}
      <footer className="portal-footer">
        © {new Date().getFullYear()} Smart Procurement System. All rights reserved.
      </footer>

    </div>
  );
}
