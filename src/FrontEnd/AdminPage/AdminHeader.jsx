import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function AdminHeader() {
  const [currentPage, setCurrentPage] = useState("home"); // Assuming 'home' is the default page
  const location = useLocation();

  // Update currentPage based on the current route
  React.useEffect(() => {
    setCurrentPage(location.pathname.replace("/", "") || "home");
  }, [location]);

  return (
    <div className="flex justify-between items-center px-10 h-20 w-full   ">
      <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
        MindRest
      </div>
      <div>
        <nav className="flex justify-between items-center gap-10 font-bold text-lg font-condensed">
          <NavLink
            to="/Requests"
            className={`nav-link ${
              currentPage === "Requests" &&
              "hover:cursor-pointer  border-b-[3px]  border-b-black"
            }`}
          >
            Approval Requests
          </NavLink>

          <NavLink
            to="/ManageAccounts"
            className={`nav-link ${
              currentPage === "ManageAccounts" &&
              "hover:cursor-pointer  border-b-[3px]  border-b-black"
            }`}
          >
            Manage Accounts
          </NavLink>
          <NavLink
            to="/AdminMessages"
            className={`nav-link ${
              currentPage === "AdminMessages" &&
              "hover:cursor-pointer  border-b-[3px]  border-b-black"
            }`}
          >
            Contacted You
          </NavLink>
          <NavLink
            to="/Login"
            className={`nav-link ${
              currentPage === "Login" &&
              "hover:cursor-pointer  border-b-[3px]  border-b-black"
            }`}
          >
            Log Out
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default AdminHeader;
