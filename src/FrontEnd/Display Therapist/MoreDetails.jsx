import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import Header2 from "../Home/header2";
import ReviewPage from "./WriteReview";
const Details = ({
  name,
  specialty,
  age,
  bio,
  gender,
  picture,
  rate,
  reviews,
}) => {
  return (
    <>
      <Header2 />
      <Link
        to="/Display"
        className="hover:cursor-pointer fixed transition-transform transform hover:scale-110"
      >
        <img
          className=" my-8 mx-12  "
          src=" src/assets/client landing/back.svg"
        ></img>
      </Link>

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
             px-4 py-2 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Set Appointment
            </Link>
          </div>
        </div>
        <p className="text-gray-700 mt-12 mb-12">{bio}</p>
        {/*<h3 className="text-lg font-bold mt-8 mb-4">Write Reviews</h3>
        <ReviewPage />
*/}
        <div className="border-t rounded-xl bg-white p-8 border-gray-200 pt-4">
          <h3 className="text-xl font-bold my-8">Reviews</h3>
          {reviews.map((review) => (
            <div className="flex mb-8 items-center " key={review.id}>
              <div>
                <div className=" flex flex-col px-4  ">
                  <p className="text-gray-600 font-bold text-md">
                    {review.reviewerName}
                  </p>
                  <div className="flex ">
                    {[...Array(5)].map((_, index) => (
                      <span
                        className={`mr-1 transform scale-125 focus:outline-none ${
                          index + 1 <= review.star
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="px-4">{review.text}</p>
              </div>
            </div>
          ))}
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
  reviews: [
    {
      id: 1,
      reviewerName: "Kidus Dawit",
      text: "This therapist is amazing!",
      star: 5,
    },
    {
      id: 2,
      reviewerName: "Kalab Dereje",
      text: "One love, hallo hallo...",
      star: 3,
    },
    {
      id: 3,
      reviewerName: "Hilina Mastewal",
      text: "Maki ataskign!",
      star: 1,
    },
    // ... other reviews
  ],
};

function App() {
  return <Details {...profileData} />;
}

export default App;
