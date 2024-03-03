import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
function Header2() {
  const [currentPage, setCurrentPage] = useState("home"); // Assuming 'home' is the default page
  const location = useLocation();

  // Update currentPage based on the current route
  React.useEffect(() => {
    setCurrentPage(location.pathname.replace("/", "") || "home");
  }, [location]);
  return (
    <>
      <div className="flex justify-between items-center px-10 h-20 w-full   ">
        <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
          MindRest
        </div>
        <div>
          <nav className="flex justify-between items-center gap-10 font-bold text-lg font-condensed">
            <NavLink
              to="/Home"
              className={`nav-link ${
                currentPage === "Home" &&
                "hover:cursor-pointer  border-b-[3px]  border-b-black"
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/Chat"
              className={`nav-link ${
                currentPage === "Chat" &&
                "hover:cursor-pointer  border-b-[3px]  border-b-black"
              }`}
            >
              Chat
            </NavLink>

            <NavLink
              to="/AboutUs"
              className={`nav-link ${
                currentPage === "AboutUs" &&
                "hover:cursor-pointer  border-b-[3px]  border-b-black"
              }`}
            >
              About
            </NavLink>
            <NavLink
              to="/Guidelines "
              className={`nav-link ${
                currentPage === "Guidelines" &&
                "hover:cursor-pointer  border-b-[3px]  border-b-black"
              }`}
            >
              Guidelines
            </NavLink>
            <NavLink
              to="/Schedule"
              className={`nav-link ${
                currentPage === "Schedule" &&
                "hover:cursor-pointer  border-b-[3px]  border-b-black"
              }`}
            >
              Schedule
            </NavLink>
            <NavLink
              to="/Contact"
              className={`nav-link ${
                currentPage === "Contact" &&
                "hover:cursor-pointer  border-b-[3px]  border-b-black"
              }`}
            >
              Contact Us
            </NavLink>
          </nav>
        </div>
        <div className=" flex justify-evenly gap-7 text-sm items-center">
          <div className="flex py-3 gap-3 font-[700] bg-[#717477] items-center bg-opacity-10  px-3 text-black rounded-3xl">
            <img
              className=" border-green-600 border-2 h-10 w-10 rounded-full "
              src="src/assets/about us/gus-moretta-BCyfpZE3aVE-unsplash.jpg"
            ></img>

            <Link
              to="/Profile "
              className="hover:cursor-pointer  bg-white bg- py-2 px-4 text-black rounded-3xl"
            >
              Meklit Engda
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Header2;
