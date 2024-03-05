// App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import endpoint from "../endpoint";
import Header2 from "../Home/header2";
import { IoVideocam } from "react-icons/io5";


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
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent newline insertion
      sendMessage(); // Your function to send the message
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() ;
}
  console.log(currentUser);
  return (
    <>
    <Header2/>
    <div className="flex  w-full  h-[90vh] overflow-y-hidden ">
      <div className="w-1/4 bg-[#045257]  bg-opacity-80 h-full">
        {userList.map((user, index) => {
          return (
            <div
              onClick={() => {
                handleClickIndex(index);
              }}
              key={index}
              className="border-b-[1px] border-teal-900 py-4 bg-[#F2894E] bg-opacity-80 flex items-center  gap-5 justify-center"
            >
              <div className=" text-xl py-4 px-6 bg-teal-500 rounded-full">{capitalizeFirstLetter(`${user.firstName}`)}</div>
              <div>
                <h1 className="text-lg ">{`${user.firstName} ${user.lastName}`}</h1>
                <p className=" text-xs text-gray-200">{`${user.email}`}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full  h-screen">
        <div className="flex items-center bg-gray-200 justify-between px-5">
          <div className="flex gap-5 h-20  items-center">
          <div className=" text-xl py-4 px-6 bg-teal-500 rounded-full">{capitalizeFirstLetter(`${currentUser.firstName}`)}</div>
            <div className="flex flex-col">
              <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
              <p className="text-gray-400">{`${currentUser.email} `}</p>
            </div>
          </div>

          <div className="flex  gap-6">
            <p><IoVideocam size={30} className="text-orange-500 hover:text-teal-600"/></p>
            <p className="px-4 py-1 bg-teal-900 hover:bg-orange-500 text-white rounded">Set an Appointment</p>
          </div>
        </div>
        <div className="w-full overflow-y-scroll p-4  h-[65%]">
          {receivedMessages.map((msg, index) => {
            if (msg.senderName == userName) {
              return <SenderMessage  key={index} message={msg.message} />;
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
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            className="bg-teal-900 text-white p-2 px-5 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Chat;

function SenderMessage({ message }) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-[#F3D7C3] text-blue-900 rounded-lg p-2 max-w-xs">
        {message}
      </div>
    </div>
  );
}

function ReciverMessage({ message }) {
  return (
    <div className="flex justify-start mb-2">
      <div className="bg-gray-100 text-gray-700 rounded-lg p-2 max-w-xs">
        {message}
      </div>
    </div>
  );
}
