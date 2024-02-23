import React from 'react';
import { Link } from 'react-router-dom';

function welcomeForm() {
    return (
    
<div class="w-full h-[100vh] bg-white justify-start items-start inline-flex">
    <div class="hidden lg:w-[25%] w-[35%] h-full bg-teal-800 flex-col justify-start items-start md1:inline-flex">
        <div class="self-stretch grow shrink basis-0 p-2.5 flex-col  mt-8 justify-start items-start ml-10 gap-2.5 flex">
            <div class="text-neutral-50 text-[32px] font-bold font-['Roboto Condensed']">MindRest</div>
            <div class="flex-col mt-8 justify-start items-start gap-1 flex">
                <div class="justify-start items-start gap-[13px] inline-flex">
                    <div class="w-6 h-6 relative "> <img src="src/assets/check-circle.svg" width={20} height={20}></img></div>
                    <div class="pt-[3px] justify-center items-center flex">

                        <div class="text-center text-white text-sm font-normal font-['Roboto Condensed']">Welcome </div>
                    </div>
                </div>
                <div class="w-[216.60px] h-[99px] relative">
               
                    <div class="w-[35px] h-[0px] left-[12px] top-[99px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[35px] h-[0px] left-[12px] top-[35px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[216.60px] h-[35px] left-0 top-[39px] absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"> <img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[2px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the First on boarding page </div>
                        </div>
                    </div>
                </div>
                <div class="w-[216.60px] h-[63px] relative">
                    <div class="w-[35px] h-[0px] left-[11px] top-[63px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[216.60px] h-[35px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"> <img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the Second on boarding page </div>
                        </div>
                    </div>
                </div>
                <div class="w-[216.60px] h-[57px] relative">
                    <div class="w-[35px] h-[0px] left-[12px] top-[57px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[216.60px] h-[35px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"><img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the Third on boarding page </div>
                        </div>
                    </div>
                </div>
                <div class="w-[216.60px] h-[104px] relative">
                    <div class="w-[35px] h-[0px] left-[11px] top-[63px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[216.60px] h-[21.60px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"><img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the Fourth on boarding page </div>
                        </div>
                    </div>
                    <div class="w-[216.60px] h-[35px] left-0 top-[69px] absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"><img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the Fifth on boarding page </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class=" w-full self-stretch h-[87px] p-2.5 bg-teal-900 justify-center items-center gap-[10px] inline-flex">
            <div class="text-white text-sm font-normal font-['Roboto Condensed']">Do You Want to know About Us?</div>
            <div class="w-[87px] h-10 p-1 bg-red-200 rounded-2xl justify-center items-center  flex">
                <div class="text-black text-[11.20px] px-2 font-semibold font-['Roboto']">Click Here!</div>
            </div>
        </div>
    </div>
    <div class="grow shrink basis-0 self-stretch bg-neutral-50 flex-col w-full md1:w-auto md1:gap-28 sm:gap-56  gap-32 items-center  inline-flex">
    <div className="flex justify-end pt-14 w-[95%] ">
     
    <Link to='/TherapistQuestionPage' className="hover:cursor-pointer">  <img src="src/assets/next.svg" width={70} height={70}></img></Link>
        </div>
        <div className="w-full   bg-neutral-50 flex-col justify-center items-center gap-10 inline-flex">
    
    <div className="flex-col justify-center items-center gap-[5px] flex">
        <div><span className="text-black text-[28px] md:text-[35px] font-bold font-['Roboto Condensed']">Welcome To </span><span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">Mindrest</span><span className="text-black text-[35px] font-bold font-['Roboto Condensed']"> </span></div>
        <div className="text-teal-600 opacity-50 text-2xl font-semibold font-['Roboto Condensed']">Let’s Get To Know You!</div>
    </div>
    <div className="w-[343px] text-center text-neutral-500 text-sm font-normal font-['Roboto Condensed']">Gathering information about a your background, interests, and preferences allows the us to tailor your therapy experience. Personalization can contribute to a more comfortable and relevant therapeutic relationship.</div>
    <div className="w-[243px] h-[43px] relative">
      <Link to='/TherapistQuestionPage'><img src="src/assets/continue2.svg"></img></Link>  
</div>
    </div>
   </div>
   
</div>
      
      )
    }

export  default  welcomeForm