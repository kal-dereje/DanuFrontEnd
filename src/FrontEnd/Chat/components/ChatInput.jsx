import React, { useState } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form className="flex items-center  mt-4" onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-700"
        placeholder="Type your message..."
      />
      <button className="inline-flex items-center px-4 py-2 mx-2 hover:bg-[#F2894E] bg-[#045257] text-white font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
