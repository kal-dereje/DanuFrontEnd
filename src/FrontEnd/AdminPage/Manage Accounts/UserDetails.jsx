import React, { useState } from "react";
function UserDetails() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [buttonColor, setButtonColor] = useState("bg-red-600");

  const handleClick = () => {
    setIsEnabled(!isEnabled);
    setButtonColor(isEnabled ? "bg-[#045257]" : "bg-red-600");
    alert(isEnabled ? "Account Disabled" : "Account Enabled");
  };
  return (
    <div className=" m-8 mb-72 flex flex-col h-[400px] w-[400px] ">
      <div className=" bg-[#045257] rounded-2xl rounded-bl-none    text-white p-2 pb-8 px-4 w-fit">
        / User Type:Therapist
      </div>

      <div className=" flex flex-col -mt-6  p-10 bg-[#EEF2F3]  rounded-2xl">
        <div className=" ">
          <img
            className=" rounded-2xl"
            src="src/assets/about us/Screenshot 2024-02-23 135240.png"
          ></img>
        </div>
        <div>
          <h1 className="my-4 mt-8 text-xl font-semibold">Meklit Engda</h1>
        </div>
        <div>
          <p className=" text-gray-400">
            Remember to choose the method that best suits your project structure
            and preferences. Both techniques achieve the desired outcome of
            rounded top corners on buttons while keeping the bottom corners
            square.
          </p>
        </div>
        <div className="w-full bg-gray-300 h-px mt-16 my-4"></div>
        <div className=" flex justify-between items-center  flex-row">
          <div className="flex flex-row space-x-4 mt-4">
            <button
              onClick={handleClick}
              className={`px-4 py-2 rounded-md cursor-pointer text-white ${buttonColor} ${
                isEnabled
                  ? "cursor-pointer hover:bg-red-800"
                  : "cursor-pointer hover:bg-green-800"
              }
               `}
            >
              {isEnabled ? "Disable Account" : "Enable Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserDetails;
