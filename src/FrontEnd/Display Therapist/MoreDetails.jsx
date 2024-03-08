import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header2 from "../Home/header2";
import ReviewPage from "./WriteReview";
import axios from "axios";
import endpoint from "../endpoint";
const Details = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const imageData = location.state.imageData;
  const therpaist = location.state.data;
  const [review, setReviews] = useState([]);

  function setAppointment() {
    navigate("/Schedule", { state: { data: location.state.data } });
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Make a GET request to fetch the user Reviews
        const response = await axios.get(
          `${endpoint}/api/review/getReviews/${therpaist?.user?._id}`
        );

        setReviews(response.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };

    // Call the function to fetch user reviews
    fetchReviews();
  }, []);
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
            src={imageData} //  profile picture
            alt="Profile picture"
          />
          <div className=" items-center">
            <h2 className="text-xl font-bold">
              {therpaist.user.firstName + " " + therpaist.user.lastName}
            </h2>
            <p className="text-gray-600 w-2/4">
              {therpaist.user.gender}, {therpaist.user.age} years old,
              <span className="font-bold">
                {" "}
                specialty: {therpaist.speciality.join(", ")}
              </span>
            </p>
            <p className="mt-5 font-bold">Rating</p>
            <div className="flex ">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`mr-1 transform scale-125 focus:outline-none ${
                    index + 1 <= therpaist?.user?.rating
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600"></p>
          <div className=" flex flex-row items-center -mt-28">
            <p className="text-[#F2894E] mx-4 items-center  text-xl justify-center font-bold">
              {therpaist.pricePerHour}
              <span className="mx-2">ETB</span>
              rate/Hour
            </p>
            <button
              onClick={setAppointment}
              className="inline-flex 
             px-4 py-2 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Set Appointment
            </button>
          </div>
        </div>
        <p className="text-gray-700 mt-12 mb-12">{therpaist.description}</p>
        {location.state.data.clients.includes(
          sessionStorage.getItem("userID")
        ) && (
          <div>
            <h3 className="text-lg font-bold mt-8 mb-4">Write Reviews</h3>
            <ReviewPage data={location.state} />
          </div>
        )}
        <div className="border-t rounded-xl bg-white p-8 border-gray-200 pt-4">
          <h3 className="text-xl font-bold my-8">Reviews</h3>
          {review?.map((review) => (
            <div className="flex mb-8 items-center " key={review.id}>
              <div>
                <div className=" flex flex-col px-4  ">
                  <p className="text-gray-600 font-bold text-md">
                    {`${review?.client?.firstName} ${review?.client?.lastName}`}
                  </p>
                  <div className="flex ">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`mr-1 transform scale-125 focus:outline-none ${
                          index + 1 <= review?.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="px-4">{review?.reviewContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Details;
