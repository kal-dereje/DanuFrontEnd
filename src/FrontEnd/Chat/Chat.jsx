// App.js
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import endpoint from "../endpoint";
import axios from "axios";
import { IoVideocam } from "react-icons/io5";
import ClientHeader from "../Home/ClientHeader";
import Header2 from "../Home/header2";
import AdminHeader from "../AdminPage/AdminHeader";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";

export let peer;
export let incomingCallGlobal;
import { VscSend } from "react-icons/vsc";

const socket = io(endpoint); // Assuming your backend is served from the same origin
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase();
}
function Chat() {
  const navigate = useNavigate();
  const info = JSON.parse(sessionStorage.getItem("info"));
  let userList = [];
  if (sessionStorage.getItem("clients")) {
    userList = JSON.parse(sessionStorage.getItem("clients"));
  } else userList = info.client.therapistList;
  const [showNote, setShowNote] = useState(false);
  const [userID, setUserID] = useState(sessionStorage.getItem("userID"));
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"));
  const [targetUserID, setTargetUserID] = useState(() => {
    if (userList.length == 0) return 0;

    return userList[0]["_id"];
  });
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    if (userList.length == 0) return 0;

    return userList[0];
  });

  const peerInstance = useRef(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [isPhonePicked, setIsPhonePicked] = useState(false);
  const [myNote, setMyNote] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isPeer, setIsPeer] = useState(false);
  const [perrId, setPeerId] = useState(null);
  console.log("................", isPeer);
  const fetchUserProfilePicture = async () => {
    try {
      // Make a GET request to fetch the user profile picture
      const response = await axios.get(
        `${endpoint}/api/therapist/getUserProfilePicture/${currentUser?._id}`,
        {
          responseType: "arraybuffer", // Ensure response data is treated as binary data
        }
      );

      // Convert the received image data to a base64 string
      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );

      // Set the base64 image data in the state
      setProfilePic(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.log("Error fetching user profile picture:", error);
    }
  };
  useEffect(() => {
    // Call the function to fetch user profile picture
    fetchUserProfilePicture();
  }, [currentUser]);
  function fetchChat() {
    try {
      const response = axios
        .get(
          `${endpoint}/api/chat/getChatByReciverID/${userID}/${targetUserID}`
        )
        .then((response) => {
          if (response.data.messages.length == 0) setReceivedMessages([]);
          else {
            const messageData = response.data.messages.map((msg) => {
              if (msg.sender == userID)
                return {
                  message: msg.content,
                  targetUserID,
                  senderName: userName,
                };
              else return { message: msg.content, targetUserID };
            });

            setReceivedMessages([...messageData]);
          }
        })
        .catch((error) => {
          console.log("Error fetching chat:", error);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    console.log("here we go");
    console.log("here we og again", sessionStorage.getItem("userID"));
    peer = new Peer(sessionStorage.getItem("userID"));
    peer.on("open", (id) => {
      setIsPeer((prev) => !prev);
      setPeerId((prev) => id);
      console.log("hello");
      console.log("peer id");
      console.log(id);
    });
    console.log("dadfad", peer.id);
    peer.on("call", (call) => {
      const ringtone = document.getElementById("ringtone");
      if (ringtone) ringtone.play();
      console.log("incoming call");
      incomingCallGlobal = call;
      setIncomingCall(call);
    });

    peerInstance.current = peer;

    socket.emit("userID", userID);

    // Listen for 'chat message' events from the server
    socket.on("chat message", (data) => {
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    fetchChat();

    // Clean up event listeners on component unmount
    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = async () => {
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

      const response = await axios.post(`${endpoint}/api/chat/sendChat`, {
        sender: userID,
        receiver: targetUserID,
        message: message,
      });

      setMessage("");
    }
  };

  const handleClickIndex = (index) => {
    setTargetUserID(userList[index]["_id"]);
    setCurrentUser(userList[index]);

    // You can perform any other actions with the index here
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent newline insertion
      sendMessage(); // Your function to send the message
    }
  };

  const setAppointment = () => {
    const therapistId = currentUser._id;
    const response = axios
      .get(`${endpoint}/api/therapist/getTherapistByUserId/${therapistId}`)
      .then((response) => {
        navigate("/Schedule", {
          state: { data: response.data?.message },
        });
      })
      .catch((error) => {
        console.log("Error fetching chat:", error);
      });
  };

  const getNotes = async () => {
    try {
      const response = await axios.post(`${endpoint}/api/therapist/getNotes`, {
        therapistId: info?.therapist?._id,
        userId: currentUser?._id,
      });

      setMyNote(response.data.note);
      setShowNote(!showNote);
    } catch (error) {}
  };
  const setNoteFalse = () => {
    setShowNote(false);
  };
  const videoCall = () => {
    navigate("/VideoChat", {
      state: { data: currentUser, calling: true },
    });
  };
  const handleIncomingCall = () => {
    const ringtone = document.getElementById("ringtone");
    ringtone.pause();
    console.log("picking up");
    setIsPhonePicked(true);
    navigate("/VideoChat", {
      state: { data: currentUser, calling: false },
    });
  };
  const rejectIncomingCall = () => {
    const ringtone = document.getElementById("ringtone");
    ringtone.pause();
    setIncomingCall(null);
  };

  return (
    <>
      {sessionStorage.getItem("role") == "client" && <ClientHeader />}
      {sessionStorage.getItem("role") == "therapist" && <Header2 />}
      {sessionStorage.getItem("role") == "admin" && <AdminHeader />}

      {userList.length == 0 ? (
        <div className="w-full h-full bg-[#F2894E] font-semibold text-white py-5 text-lg flex items-start justify-center">
          No Chat available
        </div>
      ) : (
        <div className="flex  w-full  h-[90vh] relative overflow-y-hidden ">
          <div className="w-1/4 bg-[#045257] hidden md:block  bg-opacity-80 h-full">
            {userList.map((user, index) => {
              return (
                <div
                  onClick={() => {
                    handleClickIndex(index);
                  }}
                  key={index}
                  className="border-b-[1px] border-teal-900 py-4 bg-[#F2894E] hover:bg-opacity-90 active:bg-opacity-100   bg-opacity-80 flex items-center  gap-4 justify-center"
                >
                  <div
                    className="w-[90%]  flex items-center  gap-6  justify-start"
                    onClick={setNoteFalse}
                  >
                    <ProfilePicture
                      userId={user?._id}
                      firstName={user?.firstName}
                    />
                    <div className="flex flex-col justify-start  items-start">
                      <h1 className="text-lg ">{`${user.firstName} ${user.lastName}`}</h1>
                      <p className=" text-xs text-gray-200">{`${user.email}`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full  h-screen">
            <div className="flex items-center bg-gray-200 justify-between px-5">
              <div className="flex gap-5 h-20  items-center">
                {profilePic == null ? (
                  <div className=" text-xl py-4 px-6 bg-teal-500 rounded-full">
                    {capitalizeFirstLetter(`${user.firstName}`)}
                  </div>
                ) : (
                  <img
                    className="border-neutral-300  text-center text-white h-16 w-16 rounded-full  border-0"
                    src={profilePic}
                    alt=" Profile Picture"
                  />
                )}
                <div className="flex flex-col">
                  <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
                  <p className="text-gray-400">{`${currentUser.email} `}</p>
                </div>
              </div>

              <div className="flex  gap-10 px-10">
                {isPeer == true || perrId != null ? (
                  <p onClick={videoCall}>
                    <IoVideocam
                      size={30}
                      className="text-orange-500 hover:text-teal-600"
                    />
                  </p>
                ) : null}
                {sessionStorage.getItem("role") == "client" && (
                  <p
                    onClick={setAppointment}
                    className="px-4 py-1 bg-teal-900 hover:bg-orange-500 text-white rounded"
                  >
                    Set an Appointment
                  </p>
                )}

                {sessionStorage.getItem("role") == "therapist" && (
                  <p
                    onClick={getNotes}
                    className="px-4 py-1 bg-teal-900 hover:bg-teal-700 active:bg-teal-600 text-white rounded"
                  >
                    My Notes
                  </p>
                )}
              </div>
            </div>
            <audio
              id="ringtone"
              src="../../src/assets/ringtones.mp3"
              loop
            ></audio>
            {incomingCall && !isPhonePicked && (
              <div className="mb-4 relative z-50">
                <p>Incoming call from {incomingCall.peer}</p>
                <button
                  onClick={handleIncomingCall}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Pick Up
                </button>
                <button
                  onClick={rejectIncomingCall}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="w-full overflow-y-scroll  p-4  h-[68%]">
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
                onKeyDown={handleKeyPress}
              />

              <button
                className="bg-blue-950 text-white p-2 px-5 rounded-lg"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
            {showNote && (
              <div className=" absolute left-0 top-56 rounded-lg bg-gray-300 flex  items-center flex-col gap-1  w-[20%] z-30 h-[28rem]">
                <p className="bg-[#1E232A] text-gray-300 text-xs w-[95%] my-5 px-2 py-2 rounded">
                  Your Note about your Client will be saved you press the Send
                  Button
                </p>
                <textarea
                  className="bg-[#1E232A] text-gray-200 text-xs w-[96%] mb-3 px-2 py-2 h-[80%] rounded"
                  placeholder="Write here  ..."
                >
                  {myNote}
                </textarea>
                <button
                  className="absolute top-[25rem] left-[15rem]  bg-[#1E232A] hover:text-teal-500 text-gray-200 z-40"
                  onClick={getNotes}
                >
                  <VscSend size={25} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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

function ProfilePicture({ userId, firstName }) {
  const [profilePic, setProfilePic] = useState(null);
  const fetchUserProfilePicture = async () => {
    try {
      // Make a GET request to fetch the user profile picture
      const response = await axios.get(
        `${endpoint}/api/therapist/getUserProfilePicture/${userId}`,
        {
          responseType: "arraybuffer", // Ensure response data is treated as binary data
        }
      );

      // Convert the received image data to a base64 string
      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );

      // Set the base64 image data in the state
      setProfilePic(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.log("Error fetching user profile picture:", error);
    }
  };
  useEffect(() => {
    fetchUserProfilePicture();
  }, []);
  return (
    <>
      {" "}
      {profilePic == null ? (
        <div className=" text-xl py-4 px-6 bg-teal-500 rounded-full">
          {capitalizeFirstLetter(`${firstName}`)}
        </div>
      ) : (
        <img
          className="border-neutral-300  text-center text-white h-16 w-16 rounded-full  border-0"
          src={profilePic}
          alt=" Profile Picture"
        />
      )}
    </>
  );
}
