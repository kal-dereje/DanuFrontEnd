import { useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";
function AdminHeader() {
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
    <div className="flex justify-between items-center px-10 h-20 w-full   ">
      <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
        MindRest
      </div>
      <div>
        <nav className="hidden lg:flex justify-between items-center gap-10 font-bold text-lg font-condensed">
          <Link
            to="/Requests"
            className={`hover:cursor-pointer ${
              headerValue === "/Requests" ? "border-b-[3px] " : ""
            } hover:border-b-[3px] border-black`}
          >
            Approval Requests
          </Link>
          <Link
            to="/ManageAccounts"
            className={`hover:cursor-pointer ${
              headerValue === "/ManageAccounts" ? "border-b-[3px] " : ""
            } hover:border-b-[3px] border-black`}
          >
            Manage Accounts
          </Link>
          <Link
            to="/AdminMessages"
            className={`hover:cursor-pointer ${
              headerValue === "/AdminMessages" ? "border-b-[3px] " : ""
            } hover:border-b-[3px] border-black`}
          >
            Contacted You
          </Link>
          <Link
            to="/Login"
            className={`hover:cursor-pointer ${
              headerValue === "/Login" ? "border-b-[3px] " : ""
            } hover:border-b-[3px] border-black`}
          >
            Log Out
          </Link>
        </nav>
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
                to="/Requests"
                onClick={closeMenu}
                className={`nav-link ${
                  headerValue === "/Requests" &&
                  "hover:cursor-pointer  border-b-[3px]  border-b-black"
                }`}
              >
                Approval Requests
              </NavLink>
              <NavLink
                to="/ManageAccounts"
                onClick={closeMenu}
                className={`nav-link ${
                  headerValue === "/ManageAccounts" &&
                  "hover:cursor-pointer  border-b-[3px]  border-b-black"
                }`}
              >
                Manage Accounts
              </NavLink>

              <NavLink
                to="/AdminMessages"
                onClick={closeMenu}
                className={`nav-link ${
                  headerValue === "/AdminMessages" &&
                  "hover:cursor-pointer  border-b-[3px]  border-b-black"
                }`}
              >
                Contacted You
              </NavLink>
              <NavLink
                to="/Login"
                onClick={closeMenu}
                className={`nav-link ${
                  headerValue === "/Login" &&
                  "hover:cursor-pointer  border-b-[3px]  border-b-black"
                }`}
              >
                Log Out
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHeader;
