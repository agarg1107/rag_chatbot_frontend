import ChatMessageBubble from "./chat_bubble";

function ChatList({ chatHistory, loading, formatTime, messagesEndRef,darkMode }) {
  return (
    <div className={`${darkMode ? "bg-[#0F111A]" : "bg-[#ffffff]"} flex-1 overflow-y-auto px-5 py-6 space-y-4`}>
      {chatHistory.map((msg, index) => (
        <ChatMessageBubble key={index} msg={msg} formatTime={formatTime} />
      ))}

      {loading && (
        <div className="flex items-center space-x-2 animate-pulse text-sm text-gray-400">
          <span>🤖</span>
          <span className="typing-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatList;

