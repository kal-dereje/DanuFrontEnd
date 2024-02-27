import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Payement() {
  const[error, setError]=useState('')
    const [formState, setFormState] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        TransactionRef: '',
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
    
        // Check if any field is empty
        for (let key in formState) {
          if (formState.Email == ''|| formState.FirstName ==''||formState.LastName ==''||formState.PhoneNumber ==''||formState.Amount ==''||formState.TransactionRef =='') {
            setError('Please Fill all the provided Inputs ');
            return;
          }
        }
    
        // Check if phone number starts with "+251" and contains exactly 12 digits
        // if (!/^\\+251\\d{9}$/.test(formState.PhoneNumber)) {
        //   setError('Invalid phone number Format');
        //   return;
        // }
        if (isNaN(formState.Amount )) {
          setError('Amount must be a number');
          return;
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
    
<div className="w-full bg-gray-50  justify-center sm:gap-0 items-center flex flex-col">
    
    <div className="flex justify-end pt-5 w-[95%]  ">
     
    <Link to='/' className="hover:cursor-pointer  w-[44px] md:w-[90px] md:h-[50px] h-[44px]">  <img src="src/assets/next.svg" ></img></Link>
        </div>
        <div className="w-full   flex-col justify-center items-center gap-5 flex">
    
    <div className="flex-col w-full   justify-center items-center gap-[5px] flex">
        <div><span className="text-black  text-[20px] sm:text-[30px] md:text-[35px] font-bold font-['Roboto Condensed']">Hey There, </span><span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">MindRest</span><span className="text-black text-[35px] font-bold font-['Roboto Condensed']"> </span></div>
        <div className="text-teal-600 opacity-50 text-2xl font-semibold font-['Roboto Condensed']">Let’s Set up Your Payement</div>
    <div>
  
    <div className="flex flex-col sm:px-[7rem] py-5 items-center justify-center"> 
        <div className="bg-white rounded-lg flex flex-col gap-3 shadow-xl px-7 sm:px-14 py-7 ">
        
          <form onSubmit={handleSubmit} className="flex flex-col text-teal-900 ml-4">
          {error && <p className="text-red-500">{error}</p>}

            <label className="mb-1 font-semibold">First Name</label>
            <input type="text" onChange={handleChange} value={formState.FirstName} name='FirstName' className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"  />
            <label className="mb-1 font-semibold">Last Name </label>
            <input type="text" onChange={handleChange} value={formState.LastName} name='LastName' className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2" />
            <label className="mb-1 font-semibold">Email</label>
            <input type="email" onChange={handleChange} value={formState.Email} name='Email' placeholder='...@gmail.com' className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"  />
            <label className="mb-1 font-semibold">Phone Number</label>
            <input type="text" onChange={handleChange} value={formState.PhoneNumber} placeholder='09...' name='PhoneNumber' className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2" />
            <label className="mb-1 font-semibold">Amount</label>
            <input type="text" value={formState.Amount} onChange={handleChange} name='Amount' className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"  />
            <label className="mb-1 font-semibold">Transaction Reference</label>
            <input type="text" onChange={handleChange} value={formState.TransactionRef} name='TransactionRef' className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"  />
          
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