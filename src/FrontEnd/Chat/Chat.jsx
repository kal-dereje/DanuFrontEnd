// App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import endpoint from "../endpoint";

const socket = io(endpoint); // Assuming your backend is served from the same origin

function Chat() {
  const info = JSON.parse(sessionStorage.getItem("info"));
  let userList = [];
  if (sessionStorage.getItem("clients")) {
    userList = JSON.parse(sessionStorage.getItem("clients"));
  } else userList = info.client.therapistList;

  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [targetUserID, setTargetUserID] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(userList[0]);

  useEffect(() => {
    // Upon component mount, generate a random user ID
    const newUserID = sessionStorage.getItem("userID");
    const newUserName = sessionStorage.getItem("userName");

    setUserID(newUserID);
    setUserName(newUserName);
    console.log(sessionStorage.getItem("otherId"));
    setTargetUserID(userList[0]["_id"]);
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

  const handleClickIndex = (index) => {
    setTargetUserID(userList[index]["_id"]);
    setCurrentUser(userList[index]);
    // You can perform any other actions with the index here
  };
  console.log(currentUser);
  return (
    <div className="flex w-full ">
      <div className="w-1/4 bg-green-400 h-screen">
        {userList.map((user, index) => {
          return (
            <div
              onClick={() => {
                handleClickIndex(index);
              }}
              key={index}
              className=" m-3 bg-teal-300 flex items-center justify-evenly"
            >
              <div>Pic</div>
              <div>
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <p className="">{`${user.email}`}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full  h-screen">
        <div className="flex items-center justify-between px-5">
          <div className="flex gap-5 h-20 items-center ">
            <div className="rounded-full p-5 bg-green-500">PIC</div>
            <div className="flex flex-col">
              <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
              <p>{`${currentUser.email} `}</p>
            </div>
          </div>

          <div className="flex gap-10">
            <p>VIDEO ICON</p>
            <p>SET APOINTMENT</p>
          </div>
        </div>
        <div className="w-full overflow-y-scroll p-4 border-2 border-green-400 rounded-xl h-96">
          {receivedMessages.map((msg, index) => {
            if (msg.senderName == userName) {
              return <SenderMessage key={index} message={msg.message} />;
            }
            return <ReciverMessage key={index} message={msg.message} />;
          })}
        </div>
        <br />
        <div className="flex mx-2 items-center justify-between gap-5 ">
          <textarea
            className="border-2 rounded-xl  p-2 w-full "
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
