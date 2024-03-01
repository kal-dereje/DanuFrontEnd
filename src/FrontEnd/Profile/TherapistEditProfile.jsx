import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function TherapistEditprofile() {
  const[error, setError]=useState('')
    const [formState, setFormState] = useState({
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Data: []
      });
    
      const handleChange = (event) => {
        setFormState({
          ...formState,
          [event.target.name]: event.target.value
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Check if any field is empty
        for (let key in formState) {
          if ( formState.FirstName ==''||formState.LastName ==''||formState.PhoneNumber =='') {
            setError('Please Fill all the provided Inputs ');
            return;
          }
        }
    
       
        if (isNaN(formState.PhoneNumber )) {
          setError('Phone Number must be a number');
          return;
        }
    
        setFormState({
          ...formState,
          Data: [...formState.Data, {
            FirstName: formState.FirstName,
            LastName: formState.LastName,
            PhoneNumber: formState.PhoneNumber,
          }]
        });
        console.log(formState)

      };
       
    return (
    
<div className="w-full   justify-center sm:gap-0 items-center flex flex-col">
    
    <div className="flex justify-end pt-5 w-[95%]  ">
     
    <Link to='/Profile' className="hover:cursor-pointer  w-[44px] md:w-[90px] md:h-[50px] h-[44px]">  <img src="src/assets/next.svg" ></img></Link>
        </div>
        <div className="w-full   flex-col justify-center items-center gap-5 flex">
    
    <div className="flex-col w-full   justify-center items-center gap-[5px] flex">
        <div><span className="text-black  text-[25px] sm:text-[28px] md:text-[32px] font-bold font-['Roboto Condensed']">Settings, </span><span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">MindRest</span><span className="text-black text-[35px] font-bold font-['Roboto Condensed']"> </span></div>
        <div className="text-teal-600 opacity-50 text-2xl md1:mb-0 lg1:mb-0 font-semibold font-['Roboto Condensed']">Edit Your Profile</div>
    <div>
  
    <div className="flex flex-col sm:px-[6rem] py-5 items-center justify-center"> 
        <div className="bg-white rounded-lg flex flex-col gap-3 shadow-2xl px-7 sm:px-14 py-14 ">
        
          <form onSubmit={handleSubmit} className="flex flex-col text-teal-900 ml-4">
          {error && <p className="text-red-500">{error}</p>}

            <label className="mb-1 font-semibold">First Name</label>
            <input type="text" onChange={handleChange} value={formState.FirstName} name='FirstName' className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"  />
            <label className="mb-1 font-semibold">Last Name </label>
            <input type="text" onChange={handleChange} value={formState.LastName} name='LastName' className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2" />
            <label className="mb-1 font-semibold">Phone Number</label>
            <input type="text" onChange={handleChange} value={formState.PhoneNumber}  name='PhoneNumber' className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2" />
          
            <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white rounded p-2 my-5" >Edit Profile</button>
          </form>
        </div>
     
      
        </div>
    </div>
   </div>
   </div>
   </div>
   

      
      )
    }

export  default  TherapistEditprofile;