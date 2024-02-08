
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import {Link } from "react-router-dom";
function Login() {
const [email, setEmail]=useState('');
const [Password, setPassword]=useState('')
 async  function submit(e){
  e.preventDefault();

  try
    {
      await axios.post("http://localhost:5001/api/user/loginUser",{
        email,Password
      })
    
  }
    catch(e){
console.log(e)
    }
  
}

  return (
    
      <div className="flex w-full justify-center md:justify-start h-[98vh] ">
        <div className="w-[75%] hidden  h-full rounded-3xl m-2 md1:flex  items-end bg-[url('src/assets/leftlogin.png')] bg-cover ">
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
        <div className="md1:w-[40%] w-[90%] sm:w-[80%] flex justify-center  ">
          <div className="w-[85%]  flex flex-col justify-center gap-1">
<h2 className=" font-[900] text-sm">MindRest</h2>
<h1 className=" font-bold text-xl mt-3">LogIn</h1>
<p className="font-[600] text-sm text-[#717477]"> Log In Today For a Jorney of Wellness</p>
<form  onSubmit={submit} className="flex flex-col gap-5 mt-12 "> 
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" onChange={(e)=>{ setEmail(e.target.value)}} type="email" name="email" placeholder="Email"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]"onChange={(e)=>{ setPassword(e.target.value)}} type="text" name="password" placeholder="Password "></input>
<div  className="flex flex-col gap-3 items-center ">
<button className="w-[90%] text-white bg-black flex font-semibold text-xs justify-center py-2 rounded-2xl"> Login in to your account</button>
{/* "<div className="flex gap-2  justify-center py-1 border-gray-600    items-center border-2 border-opacity-[0.15] font-semibold   rounded-3xl  w-[90%]">
<FcGoogle />
  <button className="text-sm"> Sign up with Google</button></div>" */}
{/* <div  className="flex gap-2 justify-center py-1 items-center border-gray-600  border-2 border-opacity-[0.15] font-semibold   rounded-3xl  w-[90%]">
<FaXTwitter />
  <input type="submit" className="text-sm"> Sign up with Twitter</input></div> */}
  <div className="flex gap-2 pt-6"> <p className="font-semibold text-xs text-[#717477]"> Dont have an account?</p>  <Link className="text-xs font-bold  border-black  border-b-2"  to="/">SignUp</Link>
</div>
</div>
</form>
</div>
        </div>
      </div>
   
    
  );
}

export default Login;