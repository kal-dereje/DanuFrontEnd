import { useEffect, useRef, useState } from "react";
import { BsMicMute } from "react-icons/bs";
import { IoMicOutline } from "react-icons/io5";
import { IoVideocamOutline, IoVideocamOffOutline } from "react-icons/io5";
import { MdOutlineCallEnd } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { CgRecord } from "react-icons/cg";
import { BiMessageDots } from "react-icons/bi";
import { MdOutlineMoreVert } from "react-icons/md";
import Peer from "peerjs";

function VideoChat() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log(id);
      setPeerId(id);
    });

    peer.on("call", (call) => {
      setIncomingCall(call);
    });

    peer.on("call", (call) => {
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

          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
            }
          });
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    });

    peerInstance.current = peer;
  }, [isRecording]);

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
      setIncomingCall(null);
    }

    if (peerInstance.current) {
      peerInstance.current.disconnect();
      peerInstance.current.destroy();
    }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
    setIsMicMuted(false);
    setIsVideoOn(false);

    if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };
  const toggleMic = () => {
    const tracks = currentUserVideoRef.current.srcObject.getAudioTracks();
    tracks.forEach((track) => (track.enabled = !isMicMuted));
    setIsMicMuted(!isMicMuted);
  };

  const handleIncomingCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }

        setIncomingCall(null); // clear incoming call state

        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  };

  const toggleVideo = () => {
    const tracks = currentUserVideoRef.current.srcObject.getVideoTracks();
    tracks.forEach((track) => (track.enabled = !isVideoOn));
    setIsVideoOn(!isVideoOn);
  };

  const rejectIncomingCall = () => {
    endCall();
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

  const handleSendClick = () => {
    // The textAreaValue variable now contains the data from the text area.
    console.log(textAreaValue);
  };
  const [textAreaValue, setTextAreaValue] = useState("");
  const [showNote, setShowNote] = useState(false);
  return (
    <div className="w-full h-[100vh] relative  flex flex-col bg-[#19202f] justify-between">
      <div className="z-10 flex  h-[92%] flex-col justify-between items-center w-full">
        <div></div>
        <div className="flex  z-30 justify-between md:ml-10  mt-10 w-[95%] ">
          <div className="flex items-center gap-2 text-black md:text-xl text-xs rounded-lg bg-gray-400  py-[5px] px-3 bg-opacity-50 ">
            <h1 className=" font-bold ">MindRest </h1>
            <div className="w-[2px] h-6 bg-gray-500"></div>
            <h1 className="text-black font-[600]"> Hilina Mastewal (You)</h1>
          </div>
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
        </div>
        <div className="md1:text-[6rem] md:text-[4rem] text-center text-[8px] xxsm:text-[3rem] text-white font-bold">
          Hilina Mekonnen
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={remotePeerIdValue}
            onChange={(e) => setRemotePeerIdValue(e.target.value)}
            className="border p-2 mr-2 z-30"
            placeholder="Enter remote peer ID"
          />
          <button
            onClick={() => call(remotePeerIdValue)}
            className=" bg-blue-500 text-white p-2 rounded z-30"
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
        {incomingCall && (
          <div className="mb-4">
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
                <BsMicMute size={25} />
              ) : (
                <IoMicOutline size={25} />
              )}
            </button>
            <button
              onClick={toggleVideo}
              className={`bg-${
                isVideoOn ? "emerald-100" : ""
              } p-1 text-black  rounded`}
            >
              {isVideoOn ? (
                <IoVideocamOffOutline size={25} />
              ) : (
                <IoVideocamOutline size={25} />
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
          <button
            onClick={() => setShowNote(!showNote)}
            className=" flex justify-end "
          >
            <BiMessageDots size={30} className="text-orange-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoChat;
