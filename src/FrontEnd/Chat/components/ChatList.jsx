import React from "react";
import { Link } from "react-router-dom";

const ChatList = ({ chats, onChatSelect, selectedChatId, user }) => {
  return (
    <div className="h-[575px]  overflow-y-auto w-64 bg-[#045257] bg-opacity-80   rounded-l-lg flex flex-col">
      {chats.map((chat, index) => (
        <Link
          key={chat._id}
          className={`p-2 hover:bg-[#F2894E] hover:bg-opacity-80 mb-3  flex items-center ${
            chat._id === selectedChatId ? "bg-[#F2894E] bg-opacity-80" : ""
          }`}
        >
          <div className="m-2">
            <img
              className="w-12 h-12 rounded-full mr-4 object-cover"
              src="https://images.unsplash.com/photo-1708623460319-3f1d8865778a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" //  profile picture
              alt="Profile picture"
            />
          </div>
          <div className=" flex flex-col items-start justify-center">
            <span className=" text-lg font-medium text-gray-900">
              {`${chat.firstName} ${chat.lastName}`}
            </span>
            <div className=" flex flex-row">
              <span className="  text-xs text-gray-300">{chat.email}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatList;
