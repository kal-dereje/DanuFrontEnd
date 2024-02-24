import { Outlet, Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex justify-between items-center px-10 h-20 w-full   ">
        <div className="py-3 px-10 rounded-xl  flex justify-center text-xl items-center  text-black font-bold">
          MindRest
        </div>
        <div>
          <nav className="flex justify-between items-center gap-10 font-bold text-lg font-condensed">
            <Link
              to="/"
              className="hover:cursor-pointer  hover:border-b-[3px]  hover: border-b-black"
            >
              Home
            </Link>
            <Link
              to="/AboutUs"
              className="hover:cursor-pointer   hover:border-b-[3px]  hover: border-b-black"
            >
              About
            </Link>
            <Link
              to="/Guidelines "
              className="hover:cursor-pointer  hover:border-b-[3px] hover: border-b-black"
            >
              Guidelines
            </Link>
          </nav>
        </div>
        <div className=" flex justify-evenly gap-7 text-sm items-center">
          <div>
            <img src="src/assets/notification.svg"></img>
          </div>
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
