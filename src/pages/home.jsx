import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "../components/chat_bubble";
import ChatHeader from "../components/chat_header";
import ChatInput from "../components/chat_input";

function Home() {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem("session_id")) {
      sessionStorage.setItem("session_id", crypto.randomUUID());
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const session_id = sessionStorage.getItem("session_id");

    setChatHistory((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id }),
      });

      const data = await response.json();
      setChatHistory((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center px-4 py-6 max-w-3xl mx-auto min-h-screen">
      <ChatHeader />
      <div className="flex-1 w-full overflow-y-auto px-1 py-4 space-y-4">
        {chatHistory.map((msg, idx) => (
          <ChatBubble key={idx} message={msg} />
        ))}
        {loading && <ChatBubble message={{ role: "bot", text: "Typing..." }} />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={sendMessage} loading={loading} />
    </section>
  );
}

export default Home;
