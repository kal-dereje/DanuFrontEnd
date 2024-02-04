
import { Outlet, Link } from "react-router-dom";
function Header() {
  return (
    <>
      <div className="flex justify-between items-center px-10 h-20 w-full bg-[#FCFCFC]  ">
        <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
          MindRest 
        </div>
        <div>
          <nav className="flex justify-between items-center gap-10 font-bold text-lg font-condensed">
            <Link to="/" className="hover:cursor-pointer  hover:border-b-[3px]  hover: border-b-black">
              Home
            </Link>
            <Link to="/signup" className="hover:cursor-pointer   hover:border-b-[3px]  hover: border-b-black">
             Chat
            </Link>
            <Link to="/Talktojulie " className="hover:cursor-pointer  hover:border-b-[3px] hover: border-b-black">
             Talk To Julie
            </Link>
            <Link to="/Schedule " className="hover:cursor-pointer  hover:border-b-[3px] hover: border-b-black">
             Schedule
            </Link>
          </nav>
        </div>
        <div className=" flex justify-evenly gap-7 text-sm items-center">
            <div><img src="src/assets/notification.svg"></img></div>
            <div className="flex gap-3 font-[700] bg-[#717477] items-center bg-opacity-10 py-3 px-3 text-black rounded-3xl">
            <Link to="/Schedule " className="hover:cursor-pointer  hover:border-b-[3px] hover: border-b-black">
             Signup
            </Link>
            <Link to="/Schedule " className="hover:cursor-pointer  bg-white bg- py-2 px-4 text-black rounded-3xl">
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
