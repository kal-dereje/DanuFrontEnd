import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import endpoint from "../endpoint";
import { RiRadioButtonLine } from "react-icons/ri";
function Header2() {
  const info = JSON.parse(sessionStorage.getItem("info"));
  const location = useLocation();
  const [imageData, setImageData] = useState(null);
  const [headerValue, setHeaderValue] = useState(location.pathname);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
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
              to="/TherapistHomePage"
              className={`hover:cursor-pointer ${
                headerValue === "/TherapistHomePage" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] hidden lg:flex border-black`}
            >
              Home
            </Link>
            <Link
              to="/Chat"
              className={`hover:cursor-pointer ${
                headerValue === "/Chat" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] hidden lg:flex border-black`}
            >
              Chat
            </Link>

            <Link
              to="/Guidelines "
              className={`hover:cursor-pointer ${
                headerValue === "/Guidelines" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] hidden lg:flex border-black`}
            >
              Guidelines
            </Link>
            <Link
              to="/TherapistSchedule"
              className={`hover:cursor-pointer ${
                headerValue === "/TherapistSchedule" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] hidden lg:flex border-black`}
            >
              Schedule
            </Link>
            <Link
              to="/Contact"
              className={`hover:cursor-pointer ${
                headerValue === "/Contact" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] hidden lg:flex border-black`}
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
              to="/TherapistProfile "
              className="hover:cursor-pointer  bg-white bg- py-2 px-4 text-black rounded-3xl"
            >
              {`${info.user.firstName} ${info.user.lastName}`}
            </Link>
          </div>
        </div>
        {/* Hamburger menu */}
        <div className="lg:hidden my-4 mr-12">
          <button onClick={toggleMenu} className="px-3 py-2 focus:outline-none">
            {showMenu ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
        {/* Responsive menu */}
        {showMenu && (
          <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 lg:hidden">
            <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white">
              <button
                onClick={closeMenu}
                className="mt-4 ml-2 mx-auto px-3 py-2 rounded-lg bg-gray-700 text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <nav className="flex flex-col items-center gap-4 font-bold text-lg font-condensed">
                <NavLink
                  to="/TherapistHomePage"
                  onClick={closeMenu}
                  className={`nav-link ${
                    headerValue === "/TherapistHomePage" &&
                    "hover:cursor-pointer  border-b-[3px]  border-b-black"
                  }`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Chat"
                  onClick={closeMenu}
                  className={`nav-link ${
                    headerValue === "/Chat" &&
                    "hover:cursor-pointer  border-b-[3px]  border-b-black"
                  }`}
                >
                  Chat
                </NavLink>

                <NavLink
                  to="/Guidelines"
                  onClick={closeMenu}
                  className={`nav-link ${
                    headerValue === "/Guidelines" &&
                    "hover:cursor-pointer  border-b-[3px]  border-b-black"
                  }`}
                >
                  Guidelines
                </NavLink>
                <NavLink
                  to="/TherapistSchedule"
                  onClick={closeMenu}
                  className={`nav-link ${
                    headerValue === "/TherapistSchedule" &&
                    "hover:cursor-pointer  border-b-[3px]  border-b-black"
                  }`}
                >
                  Schedule
                </NavLink>
                <NavLink
                  to="/Contact"
                  onClick={closeMenu}
                  className={`nav-link ${
                    headerValue === "/Contact" &&
                    "hover:cursor-pointer  border-b-[3px]  border-b-black"
                  }`}
                >
                  Contact Us
                </NavLink>
              </nav>
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
}

export default Header2;

// import { Outlet, Link } from "react-router-dom";
// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";

// function Header2() {
//   const [currentPage, setCurrentPage] = useState("home"); // Assuming 'home' is the default page
//   const location = useLocation();

//   return (
//     <div className="flex">
//       <div className="flex justify-between items-center px-10 h-20 w-full">
//         <div className="py-3 px-10 rounded-xl flex justify-center text-xl items-center text-black font-bold">
//           MindRest
//         </div>

//         {/* Desktop menu */}
//         <div className="hidden lg:block">
//           <nav className="flex justify-between items-center gap-10 font-bold text-lg font-condensed">
//             <NavLink
//               to="/Home"
//               className={`nav-link ${
//                 currentPage === "Home" &&
//                 "hover:cursor-pointer  border-b-[3px]  border-b-black"
//               }`}
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/Chat"
//               className={`nav-link ${
//                 currentPage === "Chat" &&
//                 "hover:cursor-pointer  border-b-[3px]  border-b-black"
//               }`}
//             >
//               Chat
//             </NavLink>

//             <NavLink
//               to="/AboutUs"
//               className={`nav-link ${
//                 currentPage === "AboutUs" &&
//                 "hover:cursor-pointer  border-b-[3px]  border-b-black"
//               }`}
//             >
//               About
//             </NavLink>
//             <NavLink
//               to="/Guidelines "
//               className={`nav-link ${
//                 currentPage === "Guidelines" &&
//                 "hover:cursor-pointer  border-b-[3px]  border-b-black"
//               }`}
//             >
//               Guidelines
//             </NavLink>
//             <NavLink
//               to="/Schedule"
//               className={`nav-link ${
//                 currentPage === "Schedule" &&
//                 "hover:cursor-pointer  border-b-[3px]  border-b-black"
//               }`}
//             >
//               Schedule
//             </NavLink>
//             <NavLink
//               to="/Contact"
//               className={`nav-link ${
//                 currentPage === "Contact" &&
//                 "hover:cursor-pointer  border-b-[3px]  border-b-black"
//               }`}
//             >
//               Contact Us
//             </NavLink>
//           </nav>
//         </div>
//       </div>

//       <div className=" flex justify-evenly md:mx-20 gap-7 text-sm items-center">
//         <div className="flex py-2 gap-3 font-[700] bg-[#717477] items-center bg-opacity-10  px-3 text-black rounded-3xl">
//           <img
//             className=" border-green-600 border-2 h-10 w-10 rounded-full "
//             src="src/assets/about us/gus-moretta-BCyfpZE3aVE-unsplash.jpg"
//           ></img>

//           <Link
//             to="/Profile "
//             className="hover:cursor-pointer w-40  bg-white bg- py-2 px-4 text-black rounded-3xl"
//           >
//             Meklit Engda
//           </Link>
//         </div>
//       </div>

// <Outlet />
//     </div>
//   );
// }

// export default Header2;
