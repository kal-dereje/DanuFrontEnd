import { Outlet, Link } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { HiCreditCard } from "react-icons/hi";
import { HiUser } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";
import { HiMiniEnvelope } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import React, { useState ,useRef } from 'react';

function Profile() {
  const [isClicked, setIsClicked] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const fileInput = useRef(null);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
      setIsClicked(false)
    }
  };

  const handleButtonClick = () => {
    fileInput.current.click();
  };
  return (
    <>
      <Link
        to="/"
        className="hover:cursor-pointer transition-transform transform hover:scale-110"
      >
        <img
          className=" mx-12 absolute"
          src=" src/assets/client landing/back.svg"
        ></img>
      </Link>{" "}
      <div className=" mt-10 flex justify-center text-4xl tracking-tighter items-center  text-black font-bold">
        MindRest
      </div>
      <div className=" text-xl font-thin text-gray-400 text-center tracking-tighter">
        Profile
      </div>
      <div  className="flex  items-center justify-center   mt-5 mb-32 w-full">
      <div className="flex rounded-3xl shadow-lg flex-col items-center justify-center  bg-pink-200 mt-12 mb-32 w-[90%] xsm:w-[70%] sm:w-[55%] md:w-[45%] md1:w-[32%] lg:w-[27%] ">
        <div className="bg-[#045257] flex p-10 rounded-3xl pb-16 flex-col items-center h-full w-full">
          
        <img
        onClick={handleClick}
        className={`border-neutral-300  text-center text-white  border-0 ${isClicked ? 'h-[12rem] w-full rounded-sm' : 'h-32 w-32 rounded-full'}`}
        src={profilePic}
        alt=" Profile Picture"
      />
      {isClicked && (
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInput} style={{ display: 'none' }} />
          <button className="mt-4 text-sm bg-white  hover:bg-opacity-90 bg-opacity-80 px-14 py-1 rounded font-medium text-black" onClick={handleButtonClick}>Change Profile</button>
        </div>
      )}
          
          <div className=" text-xl flex items-center font-semibold text-white m-4">
            <HiUser className="mx-2 -ml-2 text-[#F2894E]" />
            Meklit Engda
          </div>
          <div className=" text-sm font-thin text-gray-400 ">
            kidus1.dawit1@gmail.com
          </div>
          <div className=" text-sm font-thin text-gray-400">+251941131095</div>
        </div>

        <div className=" flex flex-col bg-white rounded-3xl w-full shadow-xl boder-b-2 -m-10 p-12 items-center ">
          <div className="flex m-2 items-center">
            <HiViewGridAdd className=" mx-2 text-xl text-[#F2894E]" />

            <Link
              to="/Display"
              className="hover:cursor-pointer hover:font-bold font-normal   hover:text-[#045257]"
            >
              Therapists
            </Link>
          </div>
          <div className="flex m-2 items-center">
            <HiPencilAlt className=" mx-2 text-xl text-[#F2894E]" />
            <Link
              to="/ClientEditProfile"
              className="hover:cursor-pointer hover:font-bold font-normal   hover:text-[#045257]"
            >
              Edit Profile
            </Link>
          </div>
          <div className="flex m-2 items-center">
            <HiPencilAlt className=" mx-2 text-xl text-[#F2894E]" />
            <Link
              to="/ClientWelcomePage"
              className="hover:cursor-pointer hover:font-bold font-normal   hover:text-[#045257]"
            >
              Edit Questionnaire
            </Link>
          </div>
          <div className="flex m-1 text-center items-center">
            <HiCreditCard className=" mx-2 text-xl text-[#F2894E]" />
            <Link
              to="/AboutUs"
              className="hover:cursor-pointer hover:font-bold font-normal   hover:text-[#045257]"
            >
              Payment and Transaction History
            </Link>
          </div>
          <div className="flex m-2 items-center">
            <HiMiniEnvelope className=" mx-2 text-xl text-[#F2894E]" />
            <Link
              to="/Guidelines "
              className="hover:cursor-pointer hover:font-bold font-normal   hover:text-[#045257]"
            >
              Contact Us
            </Link>
          </div>
          <div className="flex m-2 items-center">
            <HiOutlineLogout className=" mx-2 text-2xl text-[#F2894E]" />
            <Link
              to="/"
              className="hover:cursor-pointer hover:font-bold font-normal   hover:text-[#045257]"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Profile;
