import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import endpoint from "../endpoint";

function Editprofile() {
  const info = JSON.parse(sessionStorage.getItem("info"));
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    firstName: info.user?.firstName,
    lastName: info.user?.lastName,
    phoneNumber: info.user?.phoneNumber,
    email: info.user?.email,
    age: info.user?.age,
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    for (let key in formState) {
      if (
        formState.firstName == "" ||
        formState.lastName == "" ||
        formState.phoneNumber == "" ||
        formState.email == "" ||
        formState.age == ""
      ) {
        setError("Please Fill all the provided Inputs ");
        return;
      }
    }

    if (isNaN(formState.phoneNumber)) {
      setError("Phone Number must be a number");
      return;
    }

    setFormState({
      ...formState,
    });
    try {
      console.log(info.user._id);
      console.log(formState);
      const response = await axios.put(
        `${endpoint}/api/user/updateUser/${info.user._id}`,
        formState
      );
      info.user = response.data;

      sessionStorage.setItem("info", JSON.stringify(info));
      navigate(-1);
      // Optionally, you can reset the form or do other actions after successful update
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="w-full   justify-center sm:gap-0 items-center flex flex-col">
      <div className="flex justify-start w-full  ">
        <button
          onClick={() => navigate(-1)}
          className="hover:cursor-pointer transition-transform transform hover:scale-110"
        >
          <img
            className=" mt-12 ml-12"
            src=" src/assets/client landing/back.svg"
          ></img>
        </button>{" "}
      </div>
      <div className="w-full   flex-col justify-center items-center gap-5 flex">
        <div className="flex-col w-full   justify-center items-center gap-[5px] flex">
          <div>
            <span className="text-black  text-[25px] sm:text-[28px] md:text-[32px] font-bold font-['Roboto Condensed']">
              Settings,{" "}
            </span>
            <span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">
              MindRest
            </span>
            <span className="text-black text-[35px] font-bold font-['Roboto Condensed']">
              {" "}
            </span>
          </div>
          <div className="text-teal-600 opacity-50 text-2xl md1:mb-0 lg1:mb-0 font-semibold font-['Roboto Condensed']">
            Edit Your Profile
          </div>
          <div>
            <div className="flex flex-col sm:px-[6rem] py-5 items-center justify-center">
              <div className="bg-white rounded-lg flex flex-col gap-3 shadow-2xl px-7 sm:px-14 py-14 ">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col text-teal-900 ml-4"
                >
                  {error && <p className="text-red-500">{error}</p>}

                  <label className="mb-1 font-semibold">First Name</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formState.firstName}
                    name="firstName"
                    className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Last Name </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formState.lastName}
                    name="lastName"
                    className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formState.phoneNumber}
                    name="phoneNumber"
                    className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Email</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formState.email}
                    name="email"
                    className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Age</label>
                  <input
                    type="number"
                    min={0}
                    onChange={handleChange}
                    value={formState.age}
                    name="age"
                    className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />

                  <button
                    type="submit"
                    className="bg-teal-700 hover:bg-teal-800 text-white rounded p-2 my-5"
                  >
                    Edit Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;
