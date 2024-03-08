import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import endpoint from "../endpoint";
import { RiRadioButtonLine } from "react-icons/ri";
function ClientHeader() {
  const info = JSON.parse(sessionStorage.getItem("info"));

  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        // Make a GET request to fetch the user profile picture
        const response = await axios.get(
          `${endpoint}/api/therapist/getUserProfilePicture/${info.user._id}`,
          {
            responseType: "arraybuffer", // Ensure response data is treated as binary data
          }
        );

        // Convert the received image data to a base64 string
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );

        // Set the base64 image data in the state
        setImageData(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching user profile picture:", error);
      }
    };

    // Call the function to fetch user profile picture
    fetchUserProfilePicture();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center px-10 h-20 w-full   ">
        <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
          MindRest
        </div>
        <div>
          <nav className="flex justify-between items-center gap-10 font-bold text-lg font-condensed">
            <Link
              to="/ClientHomePage"
              className="hover:cursor-pointer  hover:border-b-[3px]  hover: border-b-black"
            >
              Home
            </Link>
            <Link
              to="/Chat"
              className="hover:cursor-pointer  hover:border-b-[3px]  hover: border-b-black"
            >
              Chat
            </Link>

            <Link
              to="/Guidelines "
              className="hover:cursor-pointer  hover:border-b-[3px] hover: border-b-black"
            >
              Guidelines
            </Link>
            <Link
              to="/ClientSchedule"
              className="hover:cursor-pointer  hover:border-b-[3px]  hover: border-b-black"
            >
              Schedule
            </Link>
            <Link
              to="/Contact"
              className="hover:cursor-pointer  hover:border-b-[3px]  hover: border-b-black"
            >
              Contact Us
            </Link>
          </nav>
        </div>
        <div className=" flex justify-evenly gap-7 text-sm items-center">
          {/* <div>
            <img src="src/assets/notification.svg"></img>
          </div> */}
          <div className="flex py-3 gap-3 font-[700] bg-[#717477] items-center bg-opacity-10  px-3 text-black rounded-3xl">
            Account Status :{" "}
            {info?.user?.isActive == false ? (
              <p className="text-red-500">NOT Active</p>
            ) : (
              <p className="text-green-600">Active</p>
            )}
            {info?.user?.isActive == false ? (
              <RiRadioButtonLine className="text-red-600" />
            ) : (
              <RiRadioButtonLine className="text-green-600" />
            )}
          </div>
          <div className="flex py-3 gap-3 font-[700] bg-[#717477] items-center bg-opacity-10  px-3 text-black rounded-3xl">
            {imageData ? (
              <img
                className=" border-green-600 border-2 h-10 w-10 rounded-full "
                src={imageData}
              ></img>
            ) : (
              <div className="font-bold text-lg border-green-600 border-2 h-10 w-10 rounded-full flex items-start justify-center pt-1 ">
                {info?.user?.firstName[0]}
              </div>
            )}
            <Link
              to="/ClientProfile "
              className="hover:cursor-pointer  bg-white bg- py-2 px-4 text-black rounded-3xl"
            >
              {`${info.user.firstName} ${info.user.lastName}`}
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default ClientHeader;