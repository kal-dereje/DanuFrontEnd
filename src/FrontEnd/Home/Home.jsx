
import React, { useState, useEffect } from 'react';
function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const month = monthNames[currentDate.getMonth()];
const date = currentDate.getDate();
const year = currentDate.getFullYear();
let hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;
  return (
    <>
      <div className=" bg-[#FCFCFC] hidden md:flex gap-10 md1:gap-0 flex-col md:h-[80vh] md:flex-row  pt-3 flex-wrap  relative">
        <div className="flex flex-col gap-5 w-full h-[50%] md1:h-auto md:w-full md1:w-[65%]  md:relative pl-5  ">
          <div className=" w-52 h-[2px] rounded-lg bg-[#717477] bg-opacity-5 absolute top-72 left-12"></div>
        <button>  <img className="absolute top-[20rem] " src="/src/assets/Meet Your Therapist.svg" width="240px" height="100px"></img></button>
            <div className=" flex items-center px-3 gap-2 hover:cursor-pointer  absolute top-10 left-[10.5rem] h-8 font-[700] text-black text-sm  border-gray-600  border-2 border-opacity-5   rounded-3xl">
                <img src="src/assets/icon.svg" width={20} height={20}></img>
               <p>Self Care</p>
                </div>
            <div className="hover:cursor-pointer items-center px-4 gap-2  flex  text-sm  absolute top-10 left-[0.75rem]  h-8 font-[700] border-gray-600  border-2 border-opacity-5  text-black rounded-3xl">

            <img src="src/assets/icon1.svg" width={20} height={20}></img>
               <p>Connection</p>
            </div>
            <div className=" absolute   top-[28rem] left-[22rem] flex gap-5">
            <div className="hover:cursor-pointer items-center w-52 gap-2 px-2  flex  text-sm h-8 font-bold bg-white bg-opacity-30  text-white rounded-3xl">

            <img src="src/assets/icon1.svg" width={20} height={20}></img>
               <p>Holistic Well-Being</p>
            </div>
            <div className="hover:cursor-pointer items-center w-[14rem] gap-2 px-2  flex  text-sm   h-8 font-semibold bg-white bg-opacity-30  text-white rounded-3xl">

<img src="src/assets/icon.svg" width={20} height={20}></img>
   <p>Rediscover Your Happines</p>
</div>
             </div>
            <div className="absolute top-[400px] left-14 flex gap-3">
            <div className="hover:cursor-pointer  px-4  h-13 flex items-center font-[700] border-gray-600  border-2 border-opacity-5  text-sm text-black rounded-2xl">
   <p>Learn More</p>
</div>
 <img  src="src/assets/message.svg" ></img>
</div>

            <div >
            <img   src="src/assets/main.svg" width={850} height={500}></img></div>
        </div>
        <div className="md:flex hidden flex-col  gap-14 w-full h-[50%]  md1:h-auto md1:w-[30%] relative">
          <div>   <img className="absolute top-3 left-[18rem]" src="src/assets/Group 21.svg"></img></div>
          <div className="absolute ">
        <p className=" font-semibold text-2xl ">{month} <span className="  pl-1 text-[#F3D7C2] mt-4 ">{date}</span>,<span className=" text-[#D4EEE3] pl-3">{formatTime(hours)}:{formatTime(minutes)} {ampm}</span></p>
        <div className=" w-72 h-[2px] rounded-lg bg-[#717477] bg-opacity-5 mt-2 "></div>
        <div className=" text-base text-[#717477] font-bold  text-opacity-60 w-48 absolute"> You have a meeting with DR Jordan pertson</div> 
        </div>
<img className="w-[390px] h-[420px] absolute top-[7rem] "  src="src/assets/happy.png"  ></img>
<div className=" rounded-lg text-[#717477] font-bold  text-opacity-60 w-[26rem] absolute top-[34.5rem]">Balance Self-care practice and fostering meaningful connections.</div>
        </div>
        
       
      </div>
      

    
    </>
  );
}

export default Home;