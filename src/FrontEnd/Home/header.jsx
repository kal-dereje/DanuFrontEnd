import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
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
          </nav>
        </div>
        <div className=" flex justify-evenly gap-7 text-sm items-center">
          <div className="flex gap-3 font-[700] bg-[#717477] items-center bg-opacity-10 py-3 px-3 text-black rounded-3xl">
            <ul className="hover:cursor-pointer group flex items-center gap-4 py-1 relative hover:border-b-[3px] hover: border-b-black">
              SignUp
              <div className="absolute -bottom-[102px]   z-[10] bg-white  w-36 hidden group-hover:flex  flex-col  ">
                <Link
                  to="/TherapistSignup"
                  href=""
                  className=" pt-5  py-3 px-2 hover:bg-opacity-20 hover:bg-[#717477] hover:text-black w-full"
                >
                  For Therapist
                </Link>
                <Link
                  to="/ClientSignup"
                  href=""
                  className="pt-4 py-4 px-2 hover:bg-opacity-20 hover:bg-[#717477] hover:text-black w-full"
                >
                  For Client
                </Link>
              </div>
            </ul>
            <Link
              to="/Login "
              className="hover:cursor-pointer  bg-white bg- py-2 px-4 text-black rounded-3xl"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Header;
