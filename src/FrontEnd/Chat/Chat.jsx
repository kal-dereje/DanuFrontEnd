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
    const newUserName = sessionStorage.getItem("userName");

    setUserID(newUserID);
    setUserName(newUserName);
    console.log(sessionStorage.getItem("otherId"));
    setTargetUserID(sessionStorage.getItem("otherId"));
    // Emit 'userID' event to the server
    socket.emit("userID", newUserID);

    // Listen for 'chat message' events from the server
    socket.on("chat message", (data) => {
      console.log(data);
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
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        {
          message,
          targetUserID,
          senderName: userName,
        },
      ]);
      socket.emit("chat message", {
        message,
        targetUserID,
        senderName: userName,
      });
      console.log(receivedMessages);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chats</h1>
      <div>
        <h2>Your User ID: {userID}</h2>

        <p>{targetUserID}</p>
        <br />
      </div>

      <div className="w-1/2 h-96  overflow-y-scroll p-4 border-2 border-green-400 rounded-xl">
        {receivedMessages.map((msg, index) => {
          if (msg.senderName == userName) {
            return <SenderMessage key={index} message={msg.message} />;
          }
          return <ReciverMessage key={index} message={msg.message} />;
        })}
      </div>
      <br />
      <div className="flex w-1/2 items-center justify-between ">
        <textarea
          className="border-2 rounded-xl  p-2"
          rows="1"
          cols="50"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="bg-blue-950 text-white p-2 px-5 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

function SenderMessage({ message }) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-green-500 text-white rounded-lg p-2 max-w-xs">
        {message}
      </div>
    </div>
  );
}

function ReciverMessage({ message }) {
  return (
    <div className="flex justify-start mb-2">
      <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
        {message}
      </div>
    </div>
  );
}
