import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function VideoChat() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [combinedStream, setCombinedStream] = useState(null);

  const handleStartRecording = () => {
    const options = { mimeType: "video/webm" };

    if (currentUserVideoRef.current && remoteVideoRef.current) {
      const stream1 = currentUserVideoRef.current.captureStream();
      const stream2 = remoteVideoRef.current.captureStream();

      const combinedStream = new MediaStream([
        ...stream1.getTracks(),
        ...stream2.getTracks(),
      ]);
      setCombinedStream(combinedStream);

      const mediaRecorder = new MediaRecorder(combinedStream, options);
      setMediaRecorder(mediaRecorder);

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "combined_video.webm";
        a.click();
        window.URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
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

          // if (!mediaRecorderRef.current) {
          //   // Initialize MediaRecorder only if not already initialized
          //   mediaRecorderRef.current = new MediaRecorder(mediaStream);

          //   // Handle data available event
          //   mediaRecorderRef.current.ondataavailable = (event) => {
          //     if (event.data.size > 0) {
          //       recordedChunksRef.current.push(event.data);
          //     }
          //   };

          //   // Handle recording stopped event
          //   mediaRecorderRef.current.onstop = () => {
          //     const recordedBlob = new Blob(recordedChunksRef.current, {
          //       type: "video/mp4",
          //     });
          //     const videoUrl = URL.createObjectURL(recordedBlob);
          //     recordedChunksRef.current = [];
          //     downloadVideo(videoUrl);
          //   };
          // }

          // // Start recording
          // if (isRecording) {
          //   mediaRecorderRef.current.start();
          // }

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
  }, []);

  //function used to call other user
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

    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
    }

    setRecording(false);
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
    if (recording) {
      mediaRecorderRef.current.stop();
    } else {
      recordedChunksRef.current = [];
      mediaRecorderRef.current.start();
    }
    setRecording(!recording);
  };

  // const downloadVideo = (videoUrl) => {
  //   const a = document.createElement("a");
  //   a.href = videoUrl;
  //   a.download = "recorded-video.mp4";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   setIncomingCall(null); // clear incoming call state after download
  // };

  return (
    <div className="App">
      <h1 className="text-2xl font-bold mb-4">Current user id is {peerId}</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter remote peer ID"
        />
        <button
          onClick={() => call(remotePeerIdValue)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Call
        </button>
      </div>
      <div className="mb-4">
        <button
          onClick={toggleMic}
          className={`bg-${
            isMicMuted ? "red" : "green"
          }-500 text-white p-2 rounded mr-2`}
        >
          {isMicMuted ? "Unmute Mic" : "Mute Mic"}
        </button>
        <button
          onClick={toggleVideo}
          className={`bg-${
            isVideoOn ? "red" : "green"
          }-500 text-white p-2 rounded`}
        >
          {isVideoOn ? "Turn Off Video" : "Turn On Video"}
        </button>
      </div>
      <div className="mb-4">
        <button onClick={handleStartRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>stope Recording</button>
      </div>
      <div className="mb-4">
        <video ref={currentUserVideoRef} className="w-40" muted />
      </div>
      <div>
        <video ref={remoteVideoRef} className="w-40" />
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
      <div className="mb-4">
        <button onClick={endCall} className="bg-red-500 text-white p-2 rounded">
          End Call
        </button>
      </div>
    </div>
  );
}

export default VideoChat;
