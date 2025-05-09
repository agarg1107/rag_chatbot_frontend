
// src/components/ChatInput.jsx
import React from "react";

function ChatInput({ userInput, setUserInput, handleSend, loading }) {
  return (
    <div className="p-4 bg-[#111322] flex items-center space-x-2 border-t border-gray-800">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask something about the news..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-[#0A0A23] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;
