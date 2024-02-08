import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import {Link } from "react-router-dom";

function ClientSignup() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isMatch, setIsMatch] = useState(true);

  const checkPasswords = () => {
      if (password !== confirmPassword) {
          setIsMatch(false);
      } else {
          setIsMatch(true);
          // proceed with signup
      }
  };
  return (
    
      <div className="flex w-full  justify-center  h-[98vh] ">
        <div className="w-[70%] h-full hidden rounded-3xl m-2 md1:flex  pb-10 items-end bg-[url('src/assets/talk_therapy.jpeg.webp')] bg-cover ">
          <div className="flex w-[90%]  justify-between">
            <div className=" w-[70%] flex flex-col  p-5">
         <div className="text-white">< FaQuoteLeft size={30}/></div> 
            <p className="  text-white text-lg p-7"> This online therapy is a true gem! The therapist are compassionate, and the platform is user-friendly.it's been a game-changer for my mental well-being .Highly recommend!</p>

            <p className="font-semibold text-2xl text-white" >Jessica Jemal</p>
            </div>
            <div className="flex gap-14">

         <button> <img src="src/assets/button left.svg" width="30px" height='30px'></img></button>
         <button> <img src="src/assets/button right.svg" width="30px" height='30px'></img></button>

            </div>
            
            </div>
             </div> 
        <div className="md1:w-[40%] md:w-[70%] w-[90%] sm:w-[80%] flex  justify-center ">
          <div className="w-[85%]  flex flex-col justify-center gap-1">
            <div className="flex  text-center  items-center gap-3">
                <h2 className=" font-[900] text-lg">MindRest</h2>
            <img  src="src/assets/message.svg" width={40} height={40} ></img>
            </div>

<h1 className=" font-bold text-xl text-[#88CAC9] mt-3">Verify Its you! </h1>
<p className="font-[600] text-sm text-[#717477]"> Thank you for choosing Mindrest for Your service! we have sent verification code to your email.Please check your inbox and enter the code below.</p>
<h1 className=" font-bold text-xl text-[#577a7a] text-center mt-3">6 Digits Code <sup>*</sup></h1>

<div  className="flex flex-col items-center ">
<input className=" border-2 text-center border-[#717477] py-3 border-opacity-[0.15] w-[85%]" type="text" name="firstName"  onChange={(e)=>{ setFirstname(e.target.value)} }placeholder="Enter 6 Digit code"></input>

<Link type="submit"  className="w-[40%] text-white mt-3 bg-black flex justify-center py-1 rounded-2xl"> Verify</Link>


</div>

</div>
        </div>
      </div>
   
    
  );
}

export default ClientSignup;
