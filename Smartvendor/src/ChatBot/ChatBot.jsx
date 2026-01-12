import { useState, useRef, useEffect } from "react";
import api from "../api/axiosConfig";
import "./ChatBot.css";

export default function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi,I’m your procurement expert. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // 🔽 Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");

    // Add user message
    setMessages(prev => [...prev, { from: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await api.post("/api/chat", {
        message: userText
      });

      setMessages(prev => [
        ...prev,
        { from: "bot", text: res.data.reply }
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-box">
      {/* HEADER */}
      <div className="chat-header">
        <span>Smart Procurement AI</span>
        <button onClick={onClose}>✖</button>
      </div>

      {/* BODY */}
      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="msg bot typing">
            Typing…
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
