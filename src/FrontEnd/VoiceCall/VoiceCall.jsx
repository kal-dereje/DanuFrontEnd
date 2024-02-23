// VoiceCall.js
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function VoiceCall() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isOnCall, setOnCall] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [isRing, setRing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const remoteVoiceRef = useRef(null);
  const currentUserVoiceRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log(id);
      setPeerId(id);
    });

    peer.on("call", (call) => {
      setRing(true);
      setIncomingCall(call);
    });

    peer.on("call", (call) => {
      console.log("user is calling to me");
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((mediaStream) => {
          if (currentUserVoiceRef.current) {
            currentUserVoiceRef.current.srcObject = mediaStream;
            currentUserVoiceRef.current.play();
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
            if (remoteVoiceRef.current) {
              remoteVoiceRef.current.srcObject = remoteStream;
              remoteVoiceRef.current.play();
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
      .getUserMedia({ audio: true })
      .then((mediaStream) => {
        if (currentUserVoiceRef.current) {
          currentUserVoiceRef.current.srcObject = mediaStream;
          currentUserVoiceRef.current.play();
        }

        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on("stream", (remoteStream) => {
          if (remoteVoiceRef.current) {
            remoteVoiceRef.current.srcObject = remoteStream;
            remoteVoiceRef.current.play();
          }
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  };

  const endCall = () => {
    if (isRing) {
      incomingCall.close();
      setRing(false);
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

    if (currentUserVoiceRef.current) {
      currentUserVoiceRef.current.srcObject = null;
    }

    if (remoteVoiceRef.current) {
      remoteVoiceRef.current.srcObject = null;
    }
  };

  const toggleMic = () => {
    const tracks = currentUserVoiceRef.current.srcObject.getAudioTracks();
    tracks.forEach((track) => (track.enabled = !isMicMuted));
    setIsMicMuted(!isMicMuted);
  };

  const handleIncomingCall = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((mediaStream) => {
        if (currentUserVoiceRef.current) {
          currentUserVoiceRef.current.srcObject = mediaStream;
          currentUserVoiceRef.current.play();
        }

        setIncomingCall(null); // clear incoming call state
        setRing(false);
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          if (remoteVoiceRef.current) {
            remoteVoiceRef.current.srcObject = remoteStream;
            remoteVoiceRef.current.play();
          }
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));
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
      </div>
      <div className="mb-4">
        <button
          onClick={toggleRecording}
          className={`bg-${
            isRecording ? "red" : "green"
          }-500 text-white p-2 rounded`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      <div className="mb-4">
        <audio
          muted
          ref={currentUserVoiceRef}
          autoPlay
          className="p-4 border border-gray-500"
        />
      </div>
      <div>
        <audio
          ref={remoteVoiceRef}
          autoPlay
          className="p-4 border border-gray-500"
        />
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

export default VoiceCall;
