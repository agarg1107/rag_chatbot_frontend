
import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./components/chat_header";
import ChatList from "./components/chat_list";
import ChatInput from "./components/chat_input";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const existing = localStorage.getItem("session_id");
    if (existing) {
      setSessionId(existing);
    } else {
      fetch("https://rag-chatbot-backend-j4hg.onrender.com/session")
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("session_id", data.session_id);
          setSessionId(data.session_id);
        });
    }
  }, [sessionId]);


  useEffect(() => {
    if (!sessionId) return;

    fetch(`https://rag-chatbot-backend-j4hg.onrender.com/history/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg) => ({
          role: msg.sender,
          message: msg.message,
          time: new Date(msg.time),
        }));

        setChatHistory(formatted);
      });
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!userInput.trim() || !sessionId) return;

    const newUserMsg = { role: "user", message: userInput, time: new Date() };
    setChatHistory((prev) => [...prev, newUserMsg]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("https://rag-chatbot-backend-j4hg.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newUserMsg.message, session_id: sessionId }),
      });
      const data = await response.json();

      setChatHistory((prev) => [
        ...prev,
        { role: "bot", message: data.reply, time: new Date() },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = async () => {
    if (!sessionId) return;
    await fetch(`https://rag-chatbot-backend-j4hg.onrender.com/reset/${sessionId}`, {
      method: "POST",
    });
    localStorage.removeItem("session_id");
    setChatHistory([]);
    setSessionId("");
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={`${
        darkMode ? "bg-[#0A0A23] text-white" : "bg-gray-100 text-black"
      } min-h-screen flex flex-col items-center p-4 sm:p-6 font-sans transition-all duration-300`}
    >
      <div className="w-full sm:max-w-2xl rounded-2xl overflow-hidden shadow-lg flex flex-col h-[90vh] border border-gray-700">
        <ChatHeader
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          resetChat={resetChat}
        />

        <ChatList
          chatHistory={chatHistory}
          loading={loading}
          formatTime={formatTime}
          messagesEndRef={messagesEndRef}
          darkMode={darkMode}
        />

        <ChatInput
          userInput={userInput}
          setUserInput={setUserInput}
          handleSend={handleSend}
          loading={loading}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;