const ChatBubble = ({ text, time, role }) => (
    <div className={`flex items-end ${role === "user" ? "justify-end" : "justify-start"}`}>
      {role === "bot" && (
        <div className="w-8 h-8 rounded-full bg-[#d62828] text-white flex items-center justify-center mr-2 text-xs">🤖</div>
      )}
      <div className={`px-4 py-2 rounded-xl max-w-sm shadow text-sm whitespace-pre-wrap ${role === "user" ? "bg-[#003049] text-white" : "bg-gray-300 text-black dark:bg-gray-700 dark:text-white"}`}>
        {text}
        <div className="text-xs text-gray-500 mt-1 text-right">{time}</div>
      </div>
      {role === "user" && (
        <div className="w-8 h-8 rounded-full bg-[#003049] text-white flex items-center justify-center ml-2 text-xs">🧑</div>
      )}
    </div>
  );
  export default ChatBubble;
  