// import SearchBar from "./SearchBar";
// import TherapistDetails from "./TherapistDetails";

import { useEffect, useState } from "react";

import endpoint from "../endpoint";
import axios from "axios";
import Header from "../Home/header";
import ClientHeader from "../Home/ClientHeader";
function ProfilePicture({ userId, firstName }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase();
  }
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
          className="border-neutral-300 mt-4 text-center text-white h-16 w-16 rounded-full  border-0"
          src={profilePic}
          alt=" Profile Picture"
        />
      )}
    </>
  );
}
function DisplayClientSchedule() {
  const [schedules, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Make a GET request to fetch the user schedules
        const response = await axios.get(
          `${endpoint}/api/schedule/getSchedules/${sessionStorage.getItem(
            "userID"
          )}`
        );
        console.log(response.data);
        setSchedule(response.data);
        // setReviews(response.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };
    fetchSchedule();
  }, []);

  const Appointment = ({ date, starttime, endtime }) => (
    <div className="flex  text-gray-900 border-b-2 border-gray-600 border-opacity-10 py-2 w-full flex-col">
      <div className="text-gray-500 font-[500]">
        <span className=" text-gray-500 ">Date :-</span> {date}
      </div>
      <div className="text-gray-500 font-[500] ">
        <span className=" text-gray-500 ">Duration:-</span> {starttime}-{" "}
        {endtime}
      </div>
    </div>
  );

  const Therapist = ({ schedule }) => (
    <div className=" m-8  flex flex-col mt-20 pb-9 pr-9 bg-[#EEF2F3] rounded-xl border-gray-800 shadow-xl    w-[400px] ">
      <div className=" bg-[#045257]  rounded-2xl rounded-bl-none    text-white p-1 px-8 w-fit">
        / Therapists
      </div>

      <div className=" flex gap-2 text-lg px-6  items-center ">
        <ProfilePicture
          userId={schedule?.therapist?._id}
          firstName={schedule?.therapist?.firstName}
        />

        <h1 className="my-4 mt-8 text-xl   font-semibold">
          {`${schedule?.therapist?.firstName} ${schedule?.therapist?.lastName}`}
        </h1>
      </div>
      <div className=" my-2 mt-3 text-xl px-6   font-bold"> Schedules</div>
      <div className="flex flex-wrap px-6   pb-6  gap-1">
        <Appointment
          starttime={schedule?.startTime}
          endtime={schedule?.endTime}
          date={`${schedule?.day} - ${schedule?.month} - ${schedule?.year} `}
        />
      </div>
    </div>
  );
  return (
    <div>
      <ClientHeader />
      <div className="w-full  flex flex-wrap justify-center items-center ">
        <div className=" grid grid-cols-3 items-center  justify-evernly  w-[90%] ">
          {schedules?.map((schedule, index) => (
            <Therapist key={index} schedule={schedule} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayClientSchedule;
