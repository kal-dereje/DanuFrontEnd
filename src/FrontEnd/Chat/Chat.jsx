import React, { useState, useEffect } from "react"; // Import useEffect

// ... rest of the code ...
const ChatMessage = ({ message, isSender }) => {
  const senderClass = isSender
    ? "bg-blue-500 text-white"
    : "bg-gray-200 text-gray-800";

  return <div className={`p-4 rounded-lg ${senderClass}`}>{message}</div>;
};

const ChatWindow = ({ messages }) => {
  return (
    <div className="h-full overflow-y-scroll px-4 py-2">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.text}
          isSender={message.sender === "you"}
        />
      ))}
    </div>
  );
};

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage(""); // Clear input after sending
  };
};
const ChatListItem = ({ user, onOpenChat }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulate unread messages (replace with actual logic)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUnreadCount((prevCount) => Math.min(prevCount + 1, 3)); // Limit unread count to 3
    }, 2000); // Simulate new messages every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-2 hover:bg-gray-200 cursor-pointer flex items-center justify-between">
      <div>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{user.name}</span>
      </div>
      {unreadCount > 0 && (
        <span className="bg-red-500 text-white px-2 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

const ChatList = ({ users, onOpenChat }) => {
  return (
    <div className="h-full overflow-y-auto border-r border-gray-300 w-64">
      {users.map((user) => (
        <ChatListItem
          key={user.id}
          user={user}
          onOpenChat={() => onOpenChat(user.id)}
        />
      ))}
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [chatHistory, setChatHistory] = useState({}); // Simulated chat history

  useEffect(() => {
    // Initialize simulated chat history (replace with actual data source if needed)
    setChatHistory({
      1: [
        { text: "Hi John!", sender: "you", timestamp: Date.now() - 1000 * 60 }, // 1 minute ago
        { text: "Hello Jane!", sender: "other", timestamp: Date.now() },
      ],
      2: [
        {
          text: "How are you doing?",
          sender: "you",
          timestamp: Date.now() - 1000 * 60 * 60,
        }, // 1 hour ago
        {
          text: "Im good, thanks for asking!",
          sender: "other",
          timestamp: Date.now() - 1000 * 30,
        }, // 30 seconds ago
      ],
    });
  }, []);

  const sendMessage = (message) => {
    const newMessage = { text: message, sender: "you", timestamp: Date.now() };
    setMessages([...messages, newMessage]);
    setChatHistory({
      ...chatHistory,
      [selectedUserId]: [...chatHistory[selectedUserId], newMessage],
    });
  };

  const openChat = (userId) => {
    setSelectedUserId(userId);
    setMessages(chatHistory[userId] || []); // Load chat history from simulated data
  };

  return (
    <div className="h-screen flex">
      <ChatList users={users} onOpenChat={openChat} />
      {selectedUserId && (
        <ChatWindow
          messages={messages}
          onSendMessage={(message) => sendMessage(message)}
        />
      )}
    </div>
  );
};

export default ChatPage;

// Sample user data (replace with your actual data)
const users = [
  { id: 1, name: "John Doe", avatar: "https://example.com/avatar1.jpg" },
  { id: 2, name: "Jane Smith", avatar: "https://example.com/avatar2.jpg" },
];
