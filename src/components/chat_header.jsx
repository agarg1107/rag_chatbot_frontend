import { Moon, Sun } from "lucide-react";

const ChatHeader = ({ darkMode, toggleDarkMode }) => (
  <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#003049] to-[#d62828] text-white">
    <h1 className="text-xl font-semibold">📰 RAG News Assistant</h1>
    <button onClick={toggleDarkMode} className="hover:opacity-80 transition">
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  </div>
);
export default ChatHeader;
