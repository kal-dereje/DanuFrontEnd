import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Payement() {
    const [formState, setFormState] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        TransactionRef: '',
        Currency: '',
        Amount: '',
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
        console.log("hello")

        setFormState({
          ...formState,
          Data: [...formState.Data, {
            FirstName: formState.FirstName,
            LastName: formState.LastName,
            Email: formState.Email,
            PhoneNumber: formState.PhoneNumber,
            TransactionRef: formState.TransactionRef,
            Currency: formState.Currency,
            Amount: formState.Amount
          }]
        });
        console.log(formState)
      };
    return (
    
<div class="w-full h-[100vh] bg-white justify-start items-start flex flex-col">
    
    <div className="flex justify-end pt-14 w-[95%] ">
     
    <Link to='/' className="hover:cursor-pointer">  <img src="src/assets/next.svg" width={70} height={70}></img></Link>
        </div>
        <div className="w-full  bg-neutral-50 flex-col justify-center items-center gap-10 flex">
    
    <div className="flex-col w-full justify-center items-center gap-[5px] flex">
        <div><span className="text-black  text-[20px] md:text-[35px] font-bold font-['Roboto Condensed']">Hey There, </span><span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">MindRest</span><span className="text-black text-[35px] font-bold font-['Roboto Condensed']"> </span></div>
        <div className="text-teal-600 opacity-50 text-2xl font-semibold font-['Roboto Condensed']">Let’s Set Up Your Payement</div>
    <div>
  
    <div className="flex flex-col mt-10 md:mt-0 px-[7rem] py-5 items-center justify-center"> 
        <div className="bg-white rounded-lg flex flex-col gap-3 shadow-xl px-14 py-7 ">
        
          <form onSubmit={handleSubmit} className="flex flex-col text-teal-900 ml-4">
            <label className="mb-1 font-semibold">First Name</label>
            <input type="text" onChange={handleChange} value={formState.FirstName} name='FirstName' className="border border-gray-200  rounded w-[20rem] p-1 mb-2"  />
            <label className="mb-1 font-semibold">Last Name </label>
            <input type="text" onChange={handleChange} value={formState.LastName} name='LastName' className="border border-gray-200 rounded w-[20rem] p-1 mb-2" />
            <label className="mb-1 font-semibold">Email</label>
            <input type="email" onChange={handleChange} value={formState.Email} name='Email' className="border border-gray-200  rounded w-[20rem] p-1 mb-2"  />
            <label className="mb-1 font-semibold">Phone Number</label>
            <input type="text" onChange={handleChange} value={formState.PhoneNumber} name='PhoneNumber' className="border border-gray-200 rounded w-[20rem] p-1 mb-2" />
            <label className="mb-1 font-semibold">Amount</label>
            <input type="text" value={formState.Amount} onChange={handleChange} name='Amount' className="border border-gray-200  rounded w-[20rem] p-1 mb-2"  />
            <label className="mb-1 font-semibold">Currency</label>
            <input type="text"  onChange={handleChange} value={formState.Currency} name='Currency' className="border border-gray-200 rounded w-[20rem] p-1 mb-2" />
            <label className="mb-1 font-semibold">Transaction Reference</label>
            <input type="text" onChange={handleChange} value={formState.TransactionRef} name='TransactionRef' className="border border-gray-200  rounded w-[20rem] p-1 mb-2"  />
          
            <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white rounded p-2" >Recieve a Link</button>
          </form>
        </div>
     
      
        </div>
    </div>
   </div>
   </div>
   </div>
   

      
      )
    }

export  default  Payement;