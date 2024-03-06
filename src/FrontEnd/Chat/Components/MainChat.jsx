import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Header2 from "../../Home/header2";
import ChatProfile from "./ChatProfile";

const MainChat = () => {
  // Sample chat data (replace with actual logic for fetching/storing chats)
  const chats = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
  ];
  const user = {
    name: "John Doe",
    phone: "+251941131095",
    email: "wow@gmail.com",
  };
  const [currentChatId, setCurrentChatId] = useState(1);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { sender: "me", text: message }]);
  };
  const handleChatSelect = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <>
      <Header2 />
      <div className="flex  mt-10 rounded-lg overflow-hidden h-[575px]">
        {/* Chat list component */}
        <ChatList
          chats={chats}
          onChatSelect={handleChatSelect}
          selectedChatId={currentChatId}
          user={user}
        />

        {/* Chat content area (with profile bar) */}
        <div className="flex-grow flex flex-col  bg-white rounded-lg shadow-md">
          {/* Profile bar */}
          <ChatProfile user={user} />

          {/* Chat content area*/}
          <div className="flex-grow flex flex-col justify-end  p-4 bg-white">
            {messages.map((message) => (
              <div className=" mb-4">
                <ChatMessage key={message.text} message={message} />
              </div>
            ))}
            <ChatInput className=" mt-auto" onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainChat;
