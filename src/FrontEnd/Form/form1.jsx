import React from 'react';
function Form1() {
    return (
    
<div class="w-full h-[100vh] bg-white justify-start items-start inline-flex">
    <div class="w-[25%] h-full bg-teal-800 flex-col justify-start items-start inline-flex">
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
                        <div class="w-[21.60px] h-[21.60px] relative"> <img src="src/assets/check-circle.svg" width={20} height={20}></img></div>
                        <div class="pt-[2px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the second on boarding page </div>
                        </div>
                    </div>
                </div>
                <div class="w-[216.60px] h-[63px] relative">
                    <div class="w-[35px] h-[0px] left-[11px] top-[63px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[216.60px] h-[35px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"> <img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the third on boarding page </div>
                        </div>
                    </div>
                </div>
                <div class="w-[216.60px] h-[57px] relative">
                    <div class="w-[35px] h-[0px] left-[12px] top-[57px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[216.60px] h-[35px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"><img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the fourth on boarding page </div>
                        </div>
                    </div>
                </div>
                <div class="w-[216.60px] h-[104px] relative">
                    <div class="w-[35px] h-[0px] left-[11px] top-[63px] absolute origin-top-left -rotate-90 border border-black"></div>
                    <div class="w-[216.60px] h-[21.60px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"><img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the fifth on boarding page </div>
                        </div>
                    </div>
                    <div class="w-[216.60px] h-[35px] left-0 top-[69px] absolute justify-start items-start gap-[13px] inline-flex">
                        <div class="w-[21.60px] h-[21.60px] relative"><img src="src/assets/Vector.png" width={20} height={20}></img></div>
                        <div class="pt-[3px] justify-center items-center gap-2.5 flex">
                            <div class="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">This is the sixth on boarding page </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="self-stretch h-[87px] p-2.5 bg-teal-900 justify-center items-center gap-[50px] inline-flex">
            <div class="text-white text-sm font-normal font-['Roboto Condensed']">Already have an account?</div>
            <div class="w-[67px] h-8 p-1 bg-red-200 rounded-2xl justify-center items-center gap-2 flex">
             <button>  <div class="text-black text-[11.20px] font-semibold font-['Roboto']">Log in</div></button> 
            </div>
        </div>
    </div>
    <div class="grow shrink basis-0 self-stretch bg-neutral-50 flex-col  justify-center items-center  inline-flex">
        <div className="flex justify-between  w-[95%] ">
       <button className="hover:cursor-pointer"> <img src="src/assets/back.svg" width={70} height={70}></img></button>
       <button className="hover:cursor-pointer">  <img src="src/assets/next.svg" width={70} height={70}></img></button>
        </div>
        <div class="p-[50px] rounded-[20px]   flex-col justify-center items-center gap-10 flex">
            <div class="h-[61px ] w-[383px] flex-col justify-center items-center gap-2.5 flex">
                <div class="self-stretch text-[#91979c] text-sm font-semibold font-['Roboto Condensed']">Over the past 2 weeks how often have you been bothered by any of the following problems:</div>
                <div class="self-stretch text-black font-bold text-base  font-['Roboto']">Select the primary reason for seeking therapy:</div>
            </div>
            <div class=" flex-col justify-center items-center gap-[15px] flex">
                <div class="w-[343px] hover:cursor-pointer px-5 py-3 hover:text-white hover:bg-teal-800 bg-emerald-100 rounded-[27px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']">
                   Improve mood
                </div>
                <div class="w-[343px] px-5 py-3 hover:cursor-pointer hover:text-white hover:bg-teal-800 bg-emerald-100 rounded-[27px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']">
                   Reduce Stress
                </div>
                <div class="w-[343px] px-5 py-3 hover:cursor-pointer hover:text-white hover:bg-teal-800 bg-emerald-100 rounded-[27px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']">
                   Improve Relationships
                </div>
                <div class="w-[343px] px-5 py-3 hover:cursor-pointer hover:text-white hover:bg-teal-800 bg-emerald-100 rounded-[27px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']">
                Develope coping stratagies
                </div>
                <div class="w-[343px] px-5 py-3 hover:cursor-pointer hover:text-white hover:bg-teal-800 bg-emerald-100 rounded-[27px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']">
                   Explore personal growth
                </div>
                <div class="w-[343px] px-5 py-3 hover:cursor-pointer hover:text-white hover:bg-teal-800 bg-emerald-100 rounded-[27px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']">
                   Others
                </div>
            </div>
        </div>
        <div className="flex w-[80%] justify-end items-start   ">
             <button><img src="src/assets/signup.png" width={65} height={65}></img>
         </button>
        </div>
    </div>
   
   
</div>
      
      )
    }

export  default  Form1