import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import endpoint from "../endpoint";
const socket = io(endpoint);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [targetUserID, settargetUserID] = useState("");

  useEffect(() => {
    socket.on("chat message", ({ targetUserID, message }) => {
      setMessages([...messages, `${targetUserID}: ${message}`]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [messages]);

  const joinChat = (targetUserID) => {
    socket.emit("targetUserID", targetUserID);
  };

  const sendMessage = () => {
    socket.emit("chat message", { message, targetUserID });
    setMessage("");
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        placeholder="target user id"
        value={targetUserID}
        onChange={(e) => settargetUserID(e.target.value)}
      />
      <button onClick={() => joinChat(targetUserID)}>Join Chat</button>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
