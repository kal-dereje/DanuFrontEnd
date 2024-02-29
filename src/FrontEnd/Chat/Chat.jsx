// App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import endpoint from "../endpoint";

const socket = io(endpoint); // Assuming your backend is served from the same origin

function Chat() {
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [targetUserID, setTargetUserID] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Upon component mount, generate a random user ID
    const newUserID = sessionStorage.getItem("userID");
    console.log(sessionStorage.getItem("info"));
    const newUserName = sessionStorage.getItem("userName");

    setUserID(newUserID);
    setUserName(newUserName);

    // Emit 'userID' event to the server
    socket.emit("userID", newUserID);

    // Listen for 'chat message' events from the server
    socket.on("chat message", (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up event listeners on component unmount
    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "" && targetUserID.trim() !== "") {
      // Emit 'chat message' event to the server

      socket.emit("chat message", {
        message,
        targetUserID,
        senderName: userName,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <h2>Your User ID: {userID}</h2>
        <input
          type="text"
          placeholder="Enter recipient's User ID"
          value={targetUserID}
          onChange={(e) => setTargetUserID(e.target.value)}
        />
        <br />
        <textarea
          rows="4"
          cols="50"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.senderName}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Chat;
