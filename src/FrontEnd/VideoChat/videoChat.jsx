import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

function VideoChat() {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          if (currentUserVideoRef.current) currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            if (remoteVideoRef.current) remoteVideoRef.current.play();
          });
        })
        .catch((error) =>
          console.error("Error accessing media devices:", error)
        );
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        if (currentUserVideoRef.current) currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          if (remoteVideoRef.current) remoteVideoRef.current.play();
        });
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  };

  const toggleMic = () => {
    const tracks = currentUserVideoRef.current.srcObject.getAudioTracks();
    tracks.forEach((track) => (track.enabled = !isMicMuted));
    setIsMicMuted(!isMicMuted);
  };

  const toggleVideo = () => {
    const tracks = currentUserVideoRef.current.srcObject.getVideoTracks();
    tracks.forEach((track) => (track.enabled = !isVideoOn));
    setIsVideoOn(!isVideoOn);
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
        <video ref={currentUserVideoRef} className="w-1/2" muted />
      </div>
      <div>
        <video ref={remoteVideoRef} className="w-1/2" />
      </div>
    </div>
  );
}

export default VideoChat;
