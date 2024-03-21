import React, { useState, useEffect } from "react";
import Header2 from "./header2";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import endpoint from "../endpoint";

function TherapistHomePage() {
  const info = JSON.parse(sessionStorage.getItem("info"));
  console.log(sessionStorage.getItem("otherId"));
  const [upcomingSchedule, setUpcomingSchedule] = useState(null);

  const getSchedule = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/api/schedule/getSchedules/${info.user._id}`
      );
      const length = response.data.length;
      console.log(response.data);
      setUpcomingSchedule(response.data[length - 1]);
    } catch (error) {
      console.log("Error fetching user schedule", error);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);
  return (
    <div>
      <Header2 />
      <div className="  lg:mx-32 m-8 lg:m-14 flex flex-row  relative">
        <div className=" flex flex-row justify-evenly">
          <div className=" flex justify-evenly flex-col z-10 -mr-36">
            <div className=" lg:flex even hidden lg:flex-row lg:-mt-4 lg:mb-8 m-3">
              <img src="src/assets/client landing/self care.svg"></img>
              <img src="src/assets/client landing/connection.svg"></img>
            </div>
            <img
              className=" mt-6 lg:-mt-10"
              src="src/assets/client landing/Landing Text.svg "
            ></img>
            <img
              className=" w-60"
              src="src/assets/client landing/Line (meet ur therapist).svg"
            ></img>
            <Link
              to="/chat"
              className=" transform -ml-14 lg:ml-0   scale-75 lg:scale-100"
            >
              <img src="src/assets/client landing/meet your therapist.svg"></img>
            </Link>
            <div className=" flex pr-48 justify-between flex-row p-auto">
              <Link
                to="/Guidelines"
                className=" outline-gray-200 flex justify-center items-center  outline-1 hover:bg-gray-100 font-semibold rounded-xl  outline px-6 tracking-tighter "
              >
                Learn More
              </Link>
              <Link
                to="/Contact"
                className=" outline-gray-200  outline-1 hover:bg-gray-100 font-semibold rounded-3xl  outline p-auto tracking-tighter "
              >
                <img src="src/assets/client landing/message icon.svg"></img>
              </Link>
            </div>
          </div>

          <div>
            <img src=" src/assets/client landing/main picture.svg"></img>
          </div>

          <div className=" lg:flex hidden flex-col">
            <div className=" flex flex-row ml-14">
              <img src=" src/assets/client landing/upcoming appointment.svg"></img>
              <div className=" flex flex-col">
                {upcomingSchedule == null ? (
                  <span className=" tracking-tighter ml-4 font-medium">
                    You have no appointment yet
                  </span>
                ) : (
                  <div className=" flex  text-lg">
                    <span className=" tracking-tighter ml-4 font-medium">
                      {upcomingSchedule?.month}
                    </span>
                    <span className=" tracking-tighter text-[#F2894E] ml-1 font-medium ">
                      {upcomingSchedule?.day},
                    </span>
                    <span className=" tracking-tighter text-[#045257] mx-1 font-medium ">
                      {upcomingSchedule?.startTime} -{" "}
                      {upcomingSchedule?.endTime}
                    </span>
                  </div>
                )}
                <img
                  className="ml-4 mt-2 opacity-50"
                  src=" src/assets/client landing/Line(schedule).svg"
                ></img>
                {upcomingSchedule == null ? (
                  <span className=" text-gray-400 tracking-tighter ml-4 text-sm ">
                    You will be scheduled when client sets appointments
                    <br />{" "}
                  </span>
                ) : (
                  <span className=" text-gray-400 tracking-tighter ml-4 text-sm ">
                    You have a meeting with <br />{" "}
                    {`${upcomingSchedule?.client?.firstName} ${upcomingSchedule?.client?.lastName}`}
                  </span>
                )}
              </div>
            </div>
            <img
              className=" -ml-8 -mt-16 w-[full] transform "
              style={{ transform: "scale(0.60)" }}
              src=" src/assets/client landing/smiling girl.svg"
            ></img>
            <img
              className="mx-16 w-72 -mt-20"
              src=" src/assets/client landing/Line(Balancing self-care).svg"
            ></img>
            <div className=" text-gray-400 tracking-tighter  mx-16 mr-8 text-sm ">
              Balancing self-care practices and fostering meaningful
              connections.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TherapistHomePage;
