
// src/components/ChatMessageBubble.jsx
import React from "react";

function ChatMessageBubble({ msg, formatTime }) {
  return (
    <div
      className={`fade-in flex items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
    >
      {msg.role === "bot" && (
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-sm animate-pop">
          🤖
        </div>
      )}
      <div
        className={`px-4 py-2 rounded-2xl max-w-sm text-sm shadow-md whitespace-pre-wrap ${
          msg.role === "user" ? "bg-[#1A73E8] text-white" : "bg-[#202239] text-gray-100"
        }`}
      >
        {msg.message}
        <div className="text-[11px] text-gray-400 mt-1 text-right">
          {formatTime(msg.time)}
        </div>
      </div>
      {msg.role === "user" && (
        <div className="w-9 h-9 rounded-full bg-[#1A73E8] text-white flex items-center justify-center ml-2 text-sm animate-pop">
          🧑
        </div>
      )}
    </div>
  );
}

export default ChatMessageBubble;

