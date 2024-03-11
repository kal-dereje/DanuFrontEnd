// VideoChatComponent.js

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import endpoint from "../endpoint";

const socket = io(endpoint); // Replace with your server URL
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const VideoChatComponent = ({}) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isCallAnswered, setIsCallAnswered] = useState(false);
  const userId = generateRandomNumber(1, 100);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    socket.emit("userID", userId);

    socket.on("incomingCall", () => {
      setIsCalling(true);
    });

    socket.on("callAnswered", () => {
      setIsCallAnswered(true);
    });

    socket.on("callEnded", () => {
      setIsCalling(false);
      setIsCallAnswered(false);
      setRemoteStream(null);
    });

    socket.on("offer", (data) => {
      handleOffer(data.offer);
    });

    socket.on("answer", (data) => {
      handleAnswer(data.answer);
    });

    socket.on("candidate", (data) => {
      handleCandidate(data.candidate);
    });
  }, []);

  const handleCall = async () => {
    const offer = await createOffer();
    socket.emit("call", { userId, callData: offer });
  };

  const handleAnswerCall = async () => {
    const answer = await createAnswer();
    socket.emit("answerCall", { userId, answerData: answer });
  };

  const handleEndCall = () => {
    socket.emit("endCall", userId);
  };

  const createOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  };

  const handleOffer = async (offer) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("answer", { answer, userId });
  };

  const handleAnswer = async (answer) => {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  const handleCandidate = async (candidate) => {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  let peerConnection = new RTCPeerConnection();

  useEffect(() => {
    if (localStream) {
      localStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, localStream));
    }

    peerConnection.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", { candidate: event.candidate, userId });
      }
    };

    return () => {
      peerConnection.close();
    };
  }, [localStream, userId]);

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay playsInline muted></video>
      </div>
      <div>
        {remoteStream && (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            srcObject={remoteStream}
          ></video>
        )}
      </div>
      <div>
        {isCalling && !isCallAnswered && (
          <button onClick={handleAnswerCall}>Answer Call</button>
        )}
        {!isCalling && <button onClick={handleCall}>Call</button>}
        <button onClick={handleEndCall}>End Call</button>
      </div>
    </div>
  );
};

export default VideoChatComponent;
