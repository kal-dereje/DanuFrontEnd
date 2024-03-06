import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header2 from "../Home/header2";
import axios from "axios";
import endpoint from "../endpoint";
import fileDownload from "js-file-download";
const Details = ({ name, specialty, age, bio, gender, userId, rate }) => {
  const [aproved, setAproved] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [cv, setCv] = useState("");
  const aproveRequest = async () => {
    try {
      const response = await axios.patch(
        `${endpoint}/api/admin/approveTherapist/${userId}`
      );

      setAproved(true);
    } catch (error) {
      console.error("Error failed to approve:", error);
    }
  };
  const downloadCv = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/api/therapist/getTherapistCv/${userId}`,
        {
          responseType: "blob", // Ensure response data is treated as a blob
        }
      );

      fileDownload(response.data, "cv.pdf");
    } catch (error) {
      console.error("Error fetching CV file:", error);
    }
  };
  // Function to fetch user profile picture
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
    // Call the function to fetch user profile picture
    fetchUserProfilePicture();
  }, []);
  return (
    <>
      <div className="flex mx-20 flex-col mt-32 mb-12 bg-[#EEF2F3]  shadow-md rounded-lg p-8">
        <div className="flex items-center mb-4">
          <img
            onClick={() => window.open(profilePic, "_blank")}
            className="w-20 h-20 rounded-full mr-4 object-cover"
            src={profilePic} //  profile picture
            alt="Profile picture"
          />
          <div className=" items-center">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600">
              {gender}, {age} years old, {specialty}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600"></p>
          <div className=" flex flex-row items-center -mt-28">
            <p className="text-[#F2894E] mx-4 items-center  text-xl justify-center font-bold">
              {" "}
              <span className="mx-2">ETB</span>
              {rate}/Hour
            </p>

            {aproved == false ? (
              <button
                onClick={aproveRequest}
                className="inline-flex 
             px-4 py-2 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Approve Therapist
              </button>
            ) : (
              <button
                disabled
                className="inline-flex 
             px-4 py-2  bg-[#F2894E] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Approved
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-700 mt-12 mb-12">{bio}</p>

        <div
          onClick={() => {
            downloadCv();
          }}
          className=" text-xl font-bold border-2 bg-white p-4 w-fit rounded-xl"
        >
          CV_FILE.PDF
        </div>
        <div className=" text-xl font-bold border-2 my-4 bg-white p-4 w-fit rounded-xl">
          LICENSE_FILE.PDF
        </div>
      </div>
    </>
  );
};

function AdminPage({ requestList }) {
  return requestList?.map((request, index) => {
    return (
      <Details
        key={index}
        name={`${request?.user?.firstName} ${request?.user?.lastName}`}
        age={request?.user?.age}
        bio={request?.description}
        gender={request?.user?.gender}
        picture={request?.user?.profilePic}
        specialty={request?.speciality?.join(", ")}
        rate={request?.pricePerHour}
        userId={request?.user?._id}
      />
    );
  });
}

export default AdminPage;
