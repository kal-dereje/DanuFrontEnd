import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";
function Signup() {
  return (
    
      <div className="flex w-full  justify-center  h-[98vh] ">
        <div className="w-[75%] h-full hidden rounded-3xl m-2 md1:flex  items-end bg-[url('src/assets/leftSignUp.png')] bg-cover ">
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
<form className="flex flex-col gap-5 mt-8 "> 
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="FirstName" placeholder="First Name"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="FirstName" placeholder="Last Name"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="FirstName" placeholder="Email"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="FirstName" placeholder="Password "></input>
<div  className="flex flex-col gap-3 items-center ">
<button className="w-[90%] text-white bg-black flex justify-center py-1 rounded-2xl"> Create an account</button>
<div className="flex gap-2  justify-center py-1 border-gray-600    items-center border-2 border-opacity-[0.15] font-semibold   rounded-3xl  w-[90%]">
<FcGoogle />
  <button className="text-sm"> Sign up with Google</button></div>
<div  className="flex gap-2 justify-center py-1 items-center border-gray-600  border-2 border-opacity-[0.15] font-semibold   rounded-3xl  w-[90%]">
<FaXTwitter />
  <button className="text-sm"> Sign up with Twitter</button></div>
  <div className="flex gap-2 pt-6"> <p className="font-semibold text-xs text-[#717477]"> Already have an account?</p><button className="text-xs font-bold  border-black  border-b-2">LogIn</button></div>

</div>
</form>
</div>
        </div>
      </div>
   
    
  );
}

export default Signup;
