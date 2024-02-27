import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import Header2 from "../Home/header2";
const Details = ({ name, specialty, age, bio, gender, picture, rate }) => {
  return (
    <>
      <div className="flex mx-20 flex-col mt-32 mb-12 bg-[#EEF2F3]  shadow-md rounded-lg p-8">
        <div className="flex items-center mb-4">
          <img
            className="w-20 h-20 rounded-full mr-4 object-cover"
            src="https://images.unsplash.com/photo-1708623460319-3f1d8865778a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" //  profile picture
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
            <Link
              className="inline-flex 
             px-4 py-2 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Approve Therapist
            </Link>
          </div>
        </div>
        <p className="text-gray-700 mt-12 mb-12">{bio}</p>
        <div className=" text-xl font-bold border-2 bg-white p-4 w-fit rounded-xl">
          CV_FILE.PDF
        </div>
        <div className=" text-xl font-bold border-2 my-4 bg-white p-4 w-fit rounded-xl">
          LICENSE_FILE.PDF
        </div>
      </div>
    </>
  );
};

const profileData = {
  name: "Meklit Engda",
  specialty: "Therapist",
  age: 35,
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  gender: "Male",
  picture: "https://via.placeholder.com/150",
  rate: 100,
};

function AdminPage() {
  return <Details {...profileData} />;
}

export default AdminPage;
