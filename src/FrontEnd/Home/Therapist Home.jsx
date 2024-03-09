import React, { useState, useEffect } from "react";
import Header2 from "./header2";
import { Outlet, Link } from "react-router-dom";

function Home() {
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
            <Link to="/chat" className=" transform -ml-14 lg:ml-0   scale-75 lg:scale-100">
              <img src="src/assets/client landing/chat with your client.svg"></img>
            </Link>
            <div className=" flex pr-48 justify-between flex-row p-auto">
              <Link to="/Guidelines" className=" outline-gray-200  outline-1 flex justify-center items-center hover:bg-gray-100 font-semibold rounded-xl  outline px-6 tracking-tighter ">
                Learn More
              </Link>
              <Link  to="/Contact" className=" outline-gray-200  outline-1 hover:bg-gray-100 font-semibold rounded-3xl  outline p-auto tracking-tighter ">
                <img src="src/assets/client landing/message icon.svg"></img>
              </Link>
            </div>
          </div>
          <div className=" flex flex-row">
            <img></img>
            <img></img>
          </div>
          <div>
            <img src=" src/assets/client landing/main picture.svg"></img>
          </div>

          <div className=" lg:flex hidden flex-col">
            <div className=" flex flex-row ml-14">
              <img src=" src/assets/client landing/upcoming appointment.svg"></img>
              <div className=" flex flex-col">
                <div className=" flex ">
                  <span className=" tracking-tighter ml-4 font-medium">
                    November
                  </span>
                  <span className=" tracking-tighter text-[#F2894E]  font-medium ">
                    8,
                  </span>

                  <span className=" tracking-tighter text-[#045257] mx-1 font-medium ">
                    10:30
                  </span>
                </div>
                <img
                  className="ml-4 mt-2 opacity-50"
                  src=" src/assets/client landing/Line(schedule).svg"
                ></img>
                <span className=" text-gray-400 tracking-tighter ml-4 text-sm ">
                  You have a meeting with <br /> Jordan Peterson
                </span>
              </div>
            </div>
            <img
              className=" -ml-8 -mt-16 transform "
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

export default Home;
