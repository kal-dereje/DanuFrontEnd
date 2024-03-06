// import SearchBar from "./SearchBar";
// import TherapistDetails from "./TherapistDetails";

import { useEffect, useState } from "react";

import endpoint from "../endpoint";
import axios from "axios";
import Header from "../Home/header";
import ClientHeader from "../Home/ClientHeader";

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
        console.log;
        setSchedule(response.data);
        // setReviews(response.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };
    fetchSchedule();
  }, []);

  const Appointment = ({ date, starttime, endtime }) => (
    <div className="flex gap-2 text-gray-900 fon flex-col">
      <div className="text-gray-400 font-semibold">
        <span className=" text-black">Date</span> {date}
      </div>
      <div className="text-gray-400 font-semibold">
        <span className=" text-black">Duration</span> {starttime}- {endtime}
      </div>
    </div>
  );

  const Therapist = ({ schedule }) => (
    <div className=" m-8 mb-72 flex flex-col  bg-[#EEF2F3] rounded-xl border-gray-500 shadow-xl  p-10 w-[400px] ">
      <div className=" bg-[#045257] rounded-2xl rounded-bl-none    text-white p-1 px-6 w-fit">
        / Therapist
      </div>

      <div className=" flex gap-2 items-center ">
        <img className=" rounded-2xl" src="src/assets/check-circle.svg"></img>

        <div>
          <h1 className="my-4 mt-8 text-xl  text-orange-400 font-semibold">
            {`${schedule?.therapist?.firstName} ${schedule?.therapist?.lastName}`}
          </h1>
        </div>
      </div>
      <div className=" my-2 mt-3 text-xl  text-emerald-800 font-bold">
        {" "}
        Schedules
      </div>
      <div className="flex flex-wrap   gap-4">
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
