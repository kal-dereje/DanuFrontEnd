import React from "react";
import { Link } from "react-router-dom";

function welcomeForm() {
  return (
    <div className="w-full h-[100vh] bg-white justify-start items-start inline-flex">
      <div className="hidden lg:w-[25%] w-[35%] h-full bg-teal-800 flex-col justify-start items-start md1:inline-flex">
        <div className="self-stretch grow shrink basis-0 p-2.5 flex-col  mt-8 justify-start items-start ml-10 gap-2.5 flex">
          <div className="text-neutral-50 text-[32px] font-bold font-['Roboto Condensed']">
            MindRest
          </div>
          <div className="flex-col mt-8 justify-start items-start gap-1 flex">
            <div className="justify-start items-start gap-[13px] inline-flex">
              <div className="w-6 h-6 relative ">
                {" "}
                <img
                  src="src/assets/check-circle.svg"
                  width={20}
                  height={20}
                ></img>
              </div>
              <div className="pt-[3px] justify-center items-center flex">
                <div className="text-center text-white text-sm font-normal font-['Roboto Condensed']">
                  Welcome{" "}
                </div>
              </div>
            </div>
            <div className="w-[216.60px] h-[99px] relative">
              <div className="w-[35px] h-[0px] left-[12px] top-[99px] absolute origin-top-left -rotate-90 border border-black"></div>
              <div className="w-[35px] h-[0px] left-[12px] top-[35px] absolute origin-top-left -rotate-90 border border-black"></div>
              <div className="w-[216.60px] h-[35px] left-0 top-[39px] absolute justify-start items-start gap-[13px] inline-flex">
                <div className="w-[21.60px] h-[21.60px] relative">
                  {" "}
                  <img src="src/assets/Vector.png" width={20} height={20}></img>
                </div>
                <div className="pt-[2px] justify-center items-center gap-2.5 flex">
                  <div className="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">
                    This is the First on boarding page{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[216.60px] h-[63px] relative">
              <div className="w-[35px] h-[0px] left-[11px] top-[63px] absolute origin-top-left -rotate-90 border border-black"></div>
              <div className="w-[216.60px] h-[35px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                <div className="w-[21.60px] h-[21.60px] relative">
                  {" "}
                  <img src="src/assets/Vector.png" width={20} height={20}></img>
                </div>
                <div className="pt-[3px] justify-center items-center gap-2.5 flex">
                  <div className="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">
                    This is the Second on boarding page{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[216.60px] h-[57px] relative">
              <div className="w-[35px] h-[0px] left-[12px] top-[57px] absolute origin-top-left -rotate-90 border border-black"></div>
              <div className="w-[216.60px] h-[35px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                <div className="w-[21.60px] h-[21.60px] relative">
                  <img src="src/assets/Vector.png" width={20} height={20}></img>
                </div>
                <div className="pt-[3px] justify-center items-center gap-2.5 flex">
                  <div className="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">
                    This is the Third on boarding page{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[216.60px] h-[104px] relative">
              <div className="w-[35px] h-[0px] left-[11px] top-[63px] absolute origin-top-left -rotate-90 border border-black"></div>
              <div className="w-[216.60px] h-[21.60px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                <div className="w-[21.60px] h-[21.60px] relative">
                  <img src="src/assets/Vector.png" width={20} height={20}></img>
                </div>
                <div className="pt-[3px] justify-center items-center gap-2.5 flex">
                  <div className="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">
                    This is the Fourth on boarding page{" "}
                  </div>
                </div>
              </div>
              <div className="w-[216.60px] h-[35px] left-0 top-[69px] absolute justify-start items-start gap-[13px] inline-flex">
                <div className="w-[21.60px] h-[21.60px] relative">
                  <img src="src/assets/Vector.png" width={20} height={20}></img>
                </div>
                <div className="pt-[3px] justify-center items-center gap-2.5 flex">
                  <div className="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">
                    This is the Fifth on boarding page{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch bg-neutral-50 flex-col w-full md1:w-auto md1:gap-28 sm:gap-56  gap-32 items-center  inline-flex">
        <div className="flex justify-end pt-14 w-[95%] ">
          <Link to="/ClientFormPage1" className="hover:cursor-pointer">
            {" "}
            <img src="src/assets/next.svg" width={70} height={70}></img>
          </Link>
        </div>
        <div className="w-full   bg-neutral-50 flex-col justify-center items-center gap-10 inline-flex">
          <div className="flex-col justify-center items-center gap-[5px] flex">
            <div>
              <span className="text-black text-[28px] md:text-[35px] font-bold font-['Roboto Condensed']">
                Welcome To{" "}
              </span>
              <span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">
                Mindrest
              </span>
              <span className="text-black text-[35px] font-bold font-['Roboto Condensed']">
                {" "}
              </span>
            </div>
            <div className="text-teal-600 opacity-50 text-2xl font-semibold font-['Roboto Condensed']">
              Let’s Get To Know You!
            </div>
          </div>
          <div className="w-[343px] text-center text-neutral-500 text-sm font-normal font-['Roboto Condensed']">
            Gathering information about a your background, interests, and
            preferences allows the us to tailor your therapy experience.
            Personalization can contribute to a more comfortable and relevant
            therapeutic relationship.
          </div>
          <div className="w-[243px] h-[43px] relative">
            <Link to="/ClientFormPage1">
              <img src="src/assets/continue2.svg"></img>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default welcomeForm;
