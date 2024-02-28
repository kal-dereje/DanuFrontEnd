import axios from "axios";
import React, { useState, useEffect } from "react";
import endpoint from "../endpoint";
import { useNavigate } from "react-router-dom";

const VerifyPayment = () => {
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Simulate verification process (replace this with actual verification logic)
        const senderId = sessionStorage.getItem("userID");
        console.log("sender id : ", senderId);
        const response = await axios.post(
          `${endpoint}/api/payment/verifypayment`,
          { clientId: senderId }
        );

        if (response.status == 200) {
          console.log(response.data);
          const data = JSON.parse(response.data);

          if (data.status == "success") {
            setVerificationStatus("verified");
            setTimeout(() => {
              setVerificationStatus("pending"); // Reset verification status after 3 seconds
            }, 3000); // 3000 milliseconds = 3 seconds
            navigate("/");
          } else {
            setVerificationStatus(
              "notVerified!! please trying we will redirect you 3 sec"
            );
            setTimeout(() => {
              setVerificationStatus("pending"); // Reset verification status after 3 seconds
            }, 3000); // 3000 milliseconds = 3 seconds
            navigate("/display");
          }
        } else {
          setVerificationStatus(
            "notVerified please try again!!! we will redirect you 3 sec"
          );
          setTimeout(() => {
            setVerificationStatus("pending"); // Reset verification status after 3 seconds
          }, 3000); // 3000 milliseconds = 3 seconds
          navigate("/display");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setVerificationStatus("notVerified");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="text-center">
        {verificationStatus === "pending" && (
          <p className="text-gray-700">Verifying payment...</p>
        )}
        {verificationStatus === "verified" && (
          <p className="text-green-500">Payment verified!</p>
        )}
        {verificationStatus === "notVerified" && (
          <p className="text-red-500">Payment not verified.</p>
        )}
        {/* Add animations based on verification status */}
        {verificationStatus === "verified" && (
          <div className="animate-bounce mt-4">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        {verificationStatus === "notVerified" && (
          <div className="animate-shake mt-4">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPayment;
