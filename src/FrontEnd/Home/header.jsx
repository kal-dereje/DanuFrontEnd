import { useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [headerValue, setHeaderValue] = useState(location.pathname);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
  return (
    <>
      <div className="flex justify-between items-center px-10 h-20 w-full   ">
        <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
          MindRest
        </div>
        <div>
          <nav className="hidden lg:flex justify-between items-center gap-10 font-bold text-lg font-condensed">
            <Link
              to="/"
              className={`hover:cursor-pointer ${
                headerValue === "/" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] border-black`}
            >
              Home
            </Link>
            <Link
              to="/AboutUs"
              className={`hover:cursor-pointer ${
                headerValue === "/AboutUs" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] border-black`}
            >
              About
            </Link>
            <Link
              to="/Guidelines "
              className={`hover:cursor-pointer ${
                headerValue === "/Guidelines" ? "border-b-[3px] " : ""
              } hover:border-b-[3px] border-black`}
            >
              Guidelines
            </Link>
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
                  to="/"
                  onClick={closeMenu}
                  className={`nav-link ${
                    headerValue === "/" &&
                    "hover:cursor-pointer  border-b-[3px]  border-b-black"
                  }`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/AboutUs"
                  onClick={closeMenu}
                  className={`nav-link ${
                    headerValue === "/AboutUs" &&
                    "hover:cursor-pointer  border-b-[3px]  border-b-black"
                  }`}
                >
                  About Us
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
              </nav>
            </div>
          </div>
        )}
      </div>

      <Outlet />
    </>
  );
}

export default Header;
