

function Home() {
  return (
    <>
      <div className=" bg-[#FCFCFC]  flex flex-col  md:flex-row mt-14 flex-wrap pl-14 relative">
        <div className="flex flex-wrap gap-5 w-full  md:w-[60%] relative  ">
          <div className=" w-52 h-[2px] rounded-lg bg-[#717477] bg-opacity-5 absolute top-72 left-12"></div>
        <button>  <img className="absolute top-96 left-14" src="/src/assets/Meet Your Therapist.svg" width="200px" height="70px"></img></button>
          <div className=" rounded-lg text-[#717477] font-bold  text-opacity-75 w-48 absolute top-[300px] left-14">Balance Self-care practice and fostering meaningful connections.</div>
            <div className=" flex items-center px-2 gap-2 hover:cursor-pointer  absolute top-5 left-40 h-8 font-[600] text-black text-sm  border-gray-600  border-2 border-opacity-5   rounded-3xl">
                <img src="src/assets/icon.svg" width={20} height={20}></img>
               <p>Self Care</p>
                </div>
            <div className="hover:cursor-pointer items-center px-2 gap-2  flex  text-sm  absolute top-5 left-10  h-8 font-semibold border-gray-600  border-2 border-opacity-5  text-black rounded-3xl">

            <img src="src/assets/icon1.svg" width={20} height={20}></img>
               <p>Connection</p>
            </div>
            <div className=" absolute   top-96 left-80 flex gap-3">
            <div className="hover:cursor-pointer items-center w-52 gap-2 px-2  flex  text-sm    h-8 font-semibold bg-white bg-opacity-30  text-white rounded-3xl">

            <img src="src/assets/icon1.svg" width={20} height={20}></img>
               <p>Holistic Well-Being</p>
            </div>
            <div className="hover:cursor-pointer items-center w-[14rem] gap-2 px-2  flex  text-sm   h-8 font-semibold bg-white bg-opacity-30  text-white rounded-3xl">

<img src="src/assets/icon.svg" width={20} height={20}></img>
   <p>Rediscover Your Happines</p>
</div>
             </div>
            <div className="absolute top-[450px] left-20 flex gap-3">
            <div className="hover:cursor-pointer  px-4  h-13 flex items-center font-[600] border-gray-600  border-2 border-opacity-5  text-sm text-black rounded-2xl">
   <p>Learn More</p>
</div>
 <img  src="src/assets/message.svg"></img>
</div>
            <div >
            <img   src="src/assets/main.svg"></img></div>
        </div>
        <div className="flex  flex-col gap-14 w-full  md:w-[40%] relative">
          <div>   <img className="absolute top-6 left-[22rem]" src="src/assets/Group 21.svg"></img></div>
          <div className="absolute ">
        <p className=" font-semibold text-2xl ">Novermber<span className="  pl-1 text-[#F3D7C2] mt-4 ">8</span>,<span className=" text-[#D4EEE3]">10:30 PM</span></p>
        <div className=" w-80 h-[2px] rounded-lg bg-[#717477] bg-opacity-5 mt-2 "></div>
        <div className=" text-base text-[#717477] font-bold  text-opacity-60 w-48 absolute  mt-2"> You have a meeting with DR Jordan pertson</div> </div>
<img className="w-[440px] h-[440px] absolute top-[9rem] "  src="src/assets/chairimage.png" ></img>
<div className="absolute top-24 pt-2 tracking-tighter  left-[9rem] pl-3 font-semibold text-3xl" >Say Hi To Julie!</div>
        </div>
        <img className="absolute top-32 left-80" src="src/assets/Line.svg"></img>
       
      </div>
      

    
    </>
  );
}

export default Home;
