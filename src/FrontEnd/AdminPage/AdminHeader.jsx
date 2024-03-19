import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
function AdminHeader() {
  const location = useLocation();
  const [headerValue, setHeaderValue] = useState(location.pathname);
  return (
    <div className="flex justify-between items-center px-10 h-20 w-full   ">
      <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
        MindRest
      </div>
      <div>
        <nav className="flex justify-between items-center gap-10 font-bold text-lg font-condensed">
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
    </div>
  );
}

export default AdminHeader;
