import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoint from "../../endpoint";
function UserDetails({ user }) {
  const [isEnabled, setIsEnabled] = useState(user?.isActive);
  const [description, setDescription] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.put(
        `${endpoint}/api/user/toggleUserActiveStatus/${user._id}`
      );

      setIsEnabled(!isEnabled);

      alert(isEnabled ? "Account Disabled" : "Account Enabled");
    } catch (error) {
      console.log("Error fetching user profile picture:", error);
    }
  };

  return (
    <>
      {user?.role != "admin" ? (
        <div className=" m-8 mb-72 flex flex-col h-[400px] w-[400px] ">
          <div className=" bg-[#045257] rounded-2xl rounded-bl-none    text-white p-2 pb-8 px-4 w-fit">
            / User Type: {user?.role}
          </div>

          <div className=" flex flex-col -mt-6  p-10 bg-[#EEF2F3]  rounded-2xl">
            <div className=" ">
              <img className=" rounded-2xl" src={user?.profilePic}></img>
            </div>
            <div>
              <h1 className="my-4 mt-8 text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</h1>
            </div>
            <div>
              <p className=" text-gray-400">
                Phone Number : {user?.phoneNumber}
              </p>
              <p className=" text-gray-400">Email : {user?.email}</p>

              {user.role == "therapist" ? (
                <p className=" text-gray-400 pt-10">
                  {user?.description?.message?.description}
                </p>
              ) : null}
            </div>
            <div className="w-full bg-gray-300 h-px mt-5 my-4"></div>
            <div className=" flex justify-between items-center  flex-row">
              <div className="flex flex-row space-x-4 mt-4">
                <button
                  onClick={handleClick}
                  className={`px-4 py-2 rounded-md cursor-pointer text-white ${
                    isEnabled
                      ? "bg-red-800 cursor-pointer hover:bg-red-800"
                      : "bg-green-800 cursor-pointer hover:bg-green-800"
                  }
             `}
                >
                  {isEnabled ? "Disable Account" : "Enable Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default UserDetails;
