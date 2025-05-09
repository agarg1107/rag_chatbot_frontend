

// import React, { useState, useEffect, useRef } from "react";
// import { Moon, Sun, RotateCcw } from "lucide-react";
// import "./App.css";

// function App() {
//   const [chatHistory, setChatHistory] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
//   const [sessionId, setSessionId] = useState("");
//   const messagesEndRef = useRef(null);

//   // Fetch or create session
//   useEffect(() => {
//     const existing = localStorage.getItem("session_id");
//     if (existing) {
//       setSessionId(existing);
//     } else {
//       fetch("https://rag-chatbot-backend-j4hg.onrender.com/session")
//         .then(res => res.json())
//         .then(data => {
//           localStorage.setItem("session_id", data.session_id);
//           setSessionId(data.session_id);
//         });
//     }
//   }, []);

//   // Fetch history when session is ready
// useEffect(() => {
//   if (!sessionId) return;

//   fetch(`https://rag-chatbot-backend-j4hg.onrender.com/history/${sessionId}`)
//     .then(res => res.json())
//     .then(data => {
//       const formatted = data.map(msg => ({
//   role: msg.sender,
//   message: msg.message, // fix: rename `text` to `message`
//   time: new Date(msg.time)
// }));

//       setChatHistory(formatted);
//     });
// }, [sessionId]);


//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory]);

//   const handleSend = async () => {
//     if (!userInput.trim() || !sessionId) return;

//     const newUserMsg = { role: "user", message: userInput, time: new Date() };
//     setChatHistory(prev => [...prev, newUserMsg]);
//     setUserInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("https://rag-chatbot-backend-j4hg.onrender.com/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: newUserMsg.message, session_id: sessionId }),
//       });
//       const data = await response.json();

//       setChatHistory(prev => [
//         ...prev,
//         { role: "bot", message: data.reply, time: new Date() },
//       ]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetChat = async () => {
//     if (!sessionId) return;
//     await fetch(`https://rag-chatbot-backend-j4hg.onrender.com/reset/${sessionId}`, { method: "POST" });
//     localStorage.removeItem("session_id");
//     setChatHistory([]);
//     setSessionId(""); // force re-fetch new session
//   };

//   const formatTime = (date) =>
//     new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   return (
//     <div className={`${darkMode ? "bg-[#0A0A23] text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center p-6 font-sans transition-all duration-300`}>
//       <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.25)] flex flex-col h-[90vh] border border-gray-700">
//         <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#1A73E8] to-[#00BFFF] text-white">
//           <h1 className="text-xl font-bold tracking-tight">🧠 RAG News Chatbot</h1>
//           <div className="flex items-center space-x-3">
//             <button onClick={resetChat} title="Reset chat" className="hover:opacity-80 transition">
//               <RotateCcw size={20} />
//             </button>
//             <button onClick={() => setDarkMode(!darkMode)} className="hover:opacity-80 transition">
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-[#0F111A]">
//           {chatHistory.map((msg, index) => (
//             <div
//               key={index}
//               className={`fade-in flex items-end ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//             >
//               {msg.role === "bot" && (
//                 <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-sm animate-pop">
//                   🤖
//                 </div>
//               )}
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-sm text-sm shadow-md whitespace-pre-wrap ${
//                   msg.role === "user"
//                     ? "bg-[#1A73E8] text-white"
//                     : "bg-[#202239] text-gray-100"
//                 }`}
//               >
//                 {msg.message}
//                 <div className="text-[11px] text-gray-400 mt-1 text-right">{formatTime(msg.time)}</div>
//               </div>
//               {msg.role === "user" && (
//                 <div className="w-9 h-9 rounded-full bg-[#1A73E8] text-white flex items-center justify-center ml-2 text-sm animate-pop">
//                   🧑
//                 </div>
//               )}
//             </div>
//           ))}
//           {loading && (
//             <div className="flex items-center space-x-2 animate-pulse text-sm text-gray-400">
//               <span>🤖</span>
//               <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="p-4 bg-[#111322] flex items-center space-x-2 border-t border-gray-800">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             placeholder="Ask something about the news..."
//             className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-[#0A0A23] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



// src/App.jsx
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

  // Fetch or create session
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
  }, []);

  // Fetch history when session is ready
useEffect(() => {
  if (sessionId) return;

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
  setSessionId(""); // This triggers the session creation effect
};


  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className={`${darkMode ? "bg-[#0A0A23] text-white" : "bg-gray-100 text-black"} min-h-screen flex flex-col items-center p-6 font-sans transition-all duration-300`}
    >
      <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.25)] flex flex-col h-[90vh] border border-gray-700">
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
        />

        <ChatInput
          userInput={userInput}
          setUserInput={setUserInput}
          handleSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
