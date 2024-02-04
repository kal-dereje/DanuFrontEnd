//import { FcGoogle } from "react-icons/fc";
//import { FaXTwitter } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";
import axios, { formToJSON } from "axios";
function Signup() {
  const [firstName, setFirstname]=useState('');
const [lastName, setLastname]=useState('')
const [email, setEmail]=useState('');
const [password, setPassword]=useState('')
const [phoneNumber, setPhonenumber]=useState('');
const [profilePic, setProfilepic]=useState(null)
const [gender, setGender]=useState('');
const [age, setAge]=useState('');
const [role, setRole]=useState('');

async function submit(e) {
  e.preventDefault();  
  try {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
   formData.append('profilePic',profilePic)
    formData.append('age', age);
    formData.append('role', role);
    formData.append('gender', gender);
   console.log(formData)


    // await axios.post('http://localhost:5001/api/user/createUser', formData).then((res)=>{
    //   console.log(formData.)
    // }) 
   
  } catch (error) {
  
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

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
<form onSubmit={submit} method="POST" className="flex flex-col gap-5 mt-8 "> 
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="firstName"  onChange={(e)=>{ setFirstname(e.target.value)} }placeholder="First Name"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="lastName"  onChange={(e)=>{ setLastname(e.target.value)}} placeholder="Last Name"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="email" name="email"  onChange={(e)=>{ setEmail(e.target.value)}} placeholder="Email"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="password" name="password"  onChange={(e)=>{ setPassword(e.target.value)}} placeholder="Password "></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="number" name="phoneNumber"  onChange={(e)=>{ setPhonenumber(e.target.value)}} placeholder="phoneNumber"></input>
<select className=" border-b-2 border-[#717477] border-opacity-[0.15] text-[#717477] w-[85%]" type="text" name="gender"  onChange={(e)=>{ setGender(e.target.value)}} placeholder="Gender">
  <option  className=" text-[#717477]"value="Female" >Female</option>
  <option   className=" text-[#717477]"  value="Male"> male</option>
</select>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="age"  onChange={(e)=>{ setAge(e.target.value)}} placeholder="Age"></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="text" name="role"  onChange={(e)=>{ setRole(e.target.value)}} placeholder="Role "></input>
<input className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]" type="file" name="profilePicture"    onChange={(e) => {
   console.log(e.target.files)
   console.log(e.target.value)
  setProfilepic(e.target.files[0])    } }
 placeholder="Profilepic "></input>

<div  className="flex flex-col gap-3 items-center ">
<button type="submit"  className="w-[90%] text-white bg-black flex justify-center py-1 rounded-2xl"> Create an account</button>

  <div className="flex gap-2 pt-6"> <p className="font-semibold text-xs text-[#717477]"> Already have an account?</p><button className="text-xs font-bold  border-black  border-b-2">LogIn</button></div>

</div>
</form>
</div>
        </div>
      </div>
   
    
  );
}

export default Signup;
