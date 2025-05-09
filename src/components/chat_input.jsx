const ChatInput = ({ userInput, setUserInput, handleSend, loading }) => (
    <div className="p-4 bg-white dark:bg-gray-800 flex items-center space-x-2 border-t border-gray-200 dark:border-gray-600">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask something about the news"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-[#d62828] text-white px-4 py-2 rounded-lg hover:bg-[#ba181b] transition"
      >
        Send
      </button>
    </div>
  );
  export default ChatInput;
  