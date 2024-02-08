import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import {Link } from "react-router-dom";

function TherapistSignup() {
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
        <div className="w-[75%] h-full hidden rounded-3xl m-2 md1:flex  pb-10 items-end bg-[url('src/assets/leftSignUp.png')] bg-cover ">
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
<h2 className=" font-[900] text-sm">MindRest</h2>
<h1 className=" font-bold text-xl mt-3">Create new account</h1>
<p className="font-[600] text-sm text-[#717477]"> Sign Up Today For a Jorney of Wellness</p>
<form onSubmit={checkPasswords} className="flex flex-col gap-5 mt-8 "> 
{!isMatch && <p className="text-red-500">Passwords do not match!</p>}
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="firstName"  onChange={(e)=>{ setFirstname(e.target.value)} }placeholder="First Name"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="lastName"  onChange={(e)=>{ setLastname(e.target.value)}} placeholder="Last Name"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="email" name="email"  onChange={(e)=>{ setEmail(e.target.value)}} placeholder="Email"></input>
<input className={`border-b-2 border-[#717477] border-opacity-[0.15] w-[85%] ${!isMatch ? 'border-red-500 border-opacity-100' : ''}`}  type="password"  value={password} name="password"  onChange={e => setPassword(e.target.value)} placeholder="Password "></input>
<input  className={`border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]  ${!isMatch ? 'border-red-500 border-opacity-100' : ''}`} type="password"  value={confirmPassword} name="Confirm Password"   onChange={e => setConfirmPassword(e.target.value)}placeholder="Confirm Password "></input>
<div  className="flex flex-col gap-3 items-center ">
<button type="submit"  className="w-[90%] text-white bg-black flex justify-center py-1 rounded-2xl"> Signup</button>
  <div className="flex gap-2 pt-6"> <p className="font-semibold text-xs text-[#717477]"> Already have an account?</p>
  <Link className="text-xs font-bold  border-black  border-b-2"  to="/Login">LogIn</Link>
  </div>

</div>
</form>
</div>
        </div>
      </div>
   
    
  );
}

export default TherapistSignup;
