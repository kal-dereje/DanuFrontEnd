import { useEffect, useRef, useState } from "react";
import { BsMicMute } from "react-icons/bs";
import { IoMicOutline } from "react-icons/io5";
import { IoVideocamOutline, IoVideocamOffOutline } from "react-icons/io5";
import { MdOutlineCallEnd } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { CgRecord } from "react-icons/cg";
import { BiMessageDots } from "react-icons/bi";
import { MdOutlineMoreVert } from "react-icons/md";
import { peer, incomingCallGlobal } from "../Chat/Chat";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import endpoint from "../endpoint";

function VideoChat() {
  const location = useLocation();

  const info = JSON.parse(sessionStorage.getItem("info"));
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState(
    location.state.data?._id
  );
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [incomingCall, setIncomingCall] = useState(incomingCallGlobal);
  const [isPhonePicked, setIsPhonePicked] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(peer);

  const [textAreaValue, setTextAreaValue] = useState("");
  const [showNote, setShowNote] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state.calling) call(remotePeerIdValue);
    else {
      console.log("picking up");
      setIsPhonePicked(true);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          if (currentUserVideoRef.current) {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();
          }

          if (!mediaRecorderRef.current) {
            // Initialize MediaRecorder only if not already initialized
            mediaRecorderRef.current = new MediaRecorder(mediaStream);

            // Handle data available event
            mediaRecorderRef.current.ondataavailable = (event) => {
              if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
              }
            };

            // Handle recording stopped event
            mediaRecorderRef.current.onstop = () => {
              const recordedBlob = new Blob(recordedChunksRef.current, {
                type: "video/mp4",
              });
              const videoUrl = URL.createObjectURL(recordedBlob);
              recordedChunksRef.current = [];
              downloadVideo(videoUrl);
            };
          }

          // Start recording
          if (isRecording) {
            mediaRecorderRef.current.start();
          }

          incomingCall.answer(mediaStream);
          incomingCall.on("stream", function (remoteStream) {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    }
  }, []);

  const call = (remotePeerId) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }

        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  };
  const endCall = () => {
    if (incomingCall) {
      incomingCall.close();
      setIsPhonePicked(false);
      setIncomingCall(null);
    }

    // if (peerInstance.current) {
    //   peerInstance.current.disconnect();
    //   peerInstance.current.destroy();
    // }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (isRecording) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsMicMuted(false);
    setIsVideoOn(false);

    // Stop video and audio tracks
    if (currentUserVideoRef.current && currentUserVideoRef.current.srcObject) {
      const tracks = currentUserVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      currentUserVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      const tracks = remoteVideoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }

    navigate(-1);
  };
  const toggleMic = () => {
    if (currentUserVideoRef.current.srcObject != null) {
      const tracks = currentUserVideoRef.current.srcObject.getAudioTracks();
      tracks.forEach((track) => (track.enabled = !isMicMuted));
      setIsMicMuted(!isMicMuted);
    }
  };

  const handleIncomingCall = () => {
    console.log("picking up");
    setIsPhonePicked(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }

        if (!mediaRecorderRef.current) {
          // Initialize MediaRecorder only if not already initialized
          mediaRecorderRef.current = new MediaRecorder(mediaStream);

          // Handle data available event
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunksRef.current.push(event.data);
            }
          };

          // Handle recording stopped event
          mediaRecorderRef.current.onstop = () => {
            const recordedBlob = new Blob(recordedChunksRef.current, {
              type: "video/mp4",
            });
            const videoUrl = URL.createObjectURL(recordedBlob);
            recordedChunksRef.current = [];
            downloadVideo(videoUrl);
          };
        }

        // Start recording
        if (isRecording) {
          mediaRecorderRef.current.start();
        }

        incomingCall.answer(mediaStream);
        incomingCall.on("stream", function (remoteStream) {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  };

  const toggleVideo = () => {
    if (currentUserVideoRef.current.srcObject != null) {
      const tracks = currentUserVideoRef.current.srcObject.getVideoTracks();
      tracks.forEach((track) => (track.enabled = !isVideoOn));
      setIsVideoOn(!isVideoOn);
    }
  };

  const rejectIncomingCall = () => {
    setIncomingCall(null);
  };

  const toggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
    } else {
      recordedChunksRef.current = [];
      mediaRecorderRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const downloadVideo = (videoUrl) => {
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = "recorded-video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIncomingCall(null); // clear incoming call state after download
  };
  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  const handleSendClick = async () => {
    try {
      const response = await axios.post(
        `${endpoint}/api/therapist/updateNoteByUser`,
        {
          content: textAreaValue,
          therapistId: info?.therapist?._id,
          userId: location.state.data?._id,
        }
      );

      console.log(response.data);
    } catch (error) {}
  };

  return (
    <div className="w-full h-[100vh] relative  flex flex-col bg-[#19202f] justify-between">
      <div className="z-10 flex  h-[92%] flex-col justify-between items-center w-full">
        <div></div>
        <div className="flex  z-30 justify-between md:ml-10  mt-10 w-[95%] ">
          <div className="flex items-center gap-2 text-black md:text-xl text-xs rounded-lg bg-gray-400  py-[5px] px-3 bg-opacity-50 ">
            <h1 className=" font-bold ">MindRest </h1>
            <div className="w-[2px] h-6 bg-gray-500"></div>
            <h1 className="text-black font-[600]">
              {" "}
              {`${info?.user?.firstName} ${info?.user?.lastName}`} (You)
            </h1>
          </div>
          {sessionStorage.getItem("role") == "therapist" && (
            <div
              className={` flex px-1 md:px-3 rounded-lg gap-1 text-[4px] hover:bg-teal-700 xxsm:text-sm sm:text-xl items-center  bg-${
                isRecording ? "emerald-200" : "teal-900"
              } text-white rounded`}
            >
              <CgRecord className="text-base md:text-xl" />
              <button onClick={toggleRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>
            </div>
          )}
        </div>
        <div className="md1:text-[6rem] md:text-[4rem] text-center text-[8px] xxsm:text-[3rem] text-white font-bold">
          {`${info?.user?.firstName} ${info?.user?.lastName}`}
        </div>
        <div className="flex mb-4 relative z-40">
          <input
            type="text"
            value={remotePeerIdValue}
            onChange={(e) => setRemotePeerIdValue(e.target.value)}
            className="border p-2 mr-2 text-white"
            placeholder="Enter remote peer ID"
            disabled
          />
          <button
            onClick={() => call(remotePeerIdValue)}
            className="relative bg-blue-500 text-white p-2 rounded z-40"
          >
            Call
          </button>
        </div>
        <video
          ref={remoteVideoRef}
          className="absolute inset-0  w-full h-full border border-gray-200  object-cover z-20"
        />
        <div className="mb-2 w-full h-[60%]  flex items-end justify-between px-10  ">
          <video
            ref={currentUserVideoRef}
            className="w-[12rem] h-[13rem] border border-gray-200  z-30"
            muted
          />
          {showNote && (
            <div className=" relative rounded-lg bg-gray-300 flex  items-center flex-col gap-2  w-[30%] z-30 h-[28rem] bg-opacity-70">
              <p className="bg-[#1E232A] text-gray-300 text-xs w-[90%] my-5 px-2 py-2 rounded">
                Your Note about your Client will only be saved when you leave
                this call after you press the Send Button
              </p>
              <textarea
                onChange={handleTextAreaChange}
                className="bg-[#1E232A] text-gray-200 text-xs w-[90%] mb-3 px-2 py-2 h-[80%] rounded"
                placeholder="Write here"
              ></textarea>
              <button
                className="absolute top-[25rem] left-[22rem]  bg-[#1E232A] hover:text-teal-500 text-gray-200 z-40"
                onClick={handleSendClick}
              >
                <VscSend size={30} />
              </button>
            </div>
          )}
        </div>
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
      </div>

      <div className="h-[6%]  z-30 w-full flex justify-evenly  items-center bg-gray-100 rounded-t-[1rem]">
        <div className="w-full  md:ml-[35%] sm:px-10 px-4 flex justify-between  items-center ">
          <div className="flex justify-center w-[90%] md:w-auto sm:gap-3 items-center  ">
            <button
              onClick={toggleMic}
              className={`bg-${
                isMicMuted ? "emerald-100" : ""
              } p-1 text-black rounded `}
            >
              {isMicMuted ? (
                <IoMicOutline size={25} />
              ) : (
                <BsMicMute size={25} />
              )}
            </button>
            <button
              onClick={toggleVideo}
              className={`bg-${
                isVideoOn ? "emerald-100" : ""
              } p-1 text-black  rounded`}
            >
              {isVideoOn ? (
                <IoVideocamOutline size={25} />
              ) : (
                <IoVideocamOffOutline size={25} />
              )}
            </button>
            <button className="text-black">
              <MdOutlineMoreVert size={25} />
            </button>
            <button
              onClick={endCall}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              <MdOutlineCallEnd size={23} className="text-black" />
            </button>
          </div>
          {sessionStorage.getItem("role") == "therapist" && (
            <button
              onClick={() => setShowNote(!showNote)}
              className=" flex justify-end "
            >
              <BiMessageDots size={30} className="text-orange-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoChat;
