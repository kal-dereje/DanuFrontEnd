import React from "react";

const ChatMessage = ({ message }) => {
  return (
    <div
      className={` p-2 rounded-lg w-fit  font-medium ${
        message.sender === "me"
          ? "bg-[#F3D7C3] float-right text-blue-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      <span className="text-gray-800">{message.sender}: </span>
      <span className="">{message.text}</span>
    </div>
  );
};

export default ChatMessage;
