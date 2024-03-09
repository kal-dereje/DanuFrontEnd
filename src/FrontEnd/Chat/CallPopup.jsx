import React, { useState } from "react";

function CallPopup() {
  const [calling, setCalling] = useState(false);

  const handleCall = () => {
    setCalling(true);
    // Simulating a call delay for 2 seconds
    setTimeout(() => {
      setCalling(false);
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleCall}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Call
      </button>
      {calling && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold mb-4">Calling...</p>
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CallPopup;
