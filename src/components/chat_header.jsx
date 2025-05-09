// src/components/ChatHeader.jsx
import React from "react";
import { RotateCcw, Moon, Sun } from "lucide-react";

function ChatHeader({ darkMode, toggleDarkMode, resetChat }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#1A73E8] to-[#00BFFF] text-white">
      <h1 className="text-xl font-bold tracking-tight">🧠 RAG News Chatbot</h1>
      <div className="flex items-center space-x-3">
        <button onClick={resetChat} title="Reset chat" className="hover:opacity-80 transition">
          <RotateCcw size={20} />
        </button>
        <button onClick={toggleDarkMode} className="hover:opacity-80 transition">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;

