function TherapistDetails() {
  return (
    <div className=" m-8 mb-72 flex flex-col h-[400px] w-[400px] ">
      <div className=" bg-[#045257] rounded-2xl rounded-bl-none    text-white p-2 pb-8 px-4 w-fit">
        / Psyciatric Expert
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
          <div className="">
            <span>
              Hourly Rate:
              <br />
              <span className=" font-semibold text-[#F2894E]">
                ETB 800/Hour
              </span>
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <button className="  inline-flex items-center px-4 py-2 border-2 border-gray-200 hover:text-white  font-normal hover:border-0 rounded-3xl hover:bg-[#045257] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TherapistDetails;
