import React from 'react';
// import { Link } from "react-router-dom";
import { useState} from 'react';

const TherapistQuestions = () => {
  const [formState, setFormState] = useState({
    Gender: '',
    Age: '',
    profilePic: null,
    cv: null,
    Description: '',
    speciality:[]
  });
  const[iserror,setIsErorr]=useState(false)
  const handleChange = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value
    });
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormState({
        ...formState,
        speciality: [...formState.speciality, e.target.value]
      });
    } else {
      setFormState({
        ...formState,
        speciality: formState.speciality.filter(speciality => speciality !== e.target.value)
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.speciality.length === 0) {
      setIsErorr(true);

    } else {
      console.log(formState);
    }
  };
    return (   
<div className="w-full h-auto bg-blue-100 justify-start items-start inline-flex">
    <div className="w-full md:w-[35%] hidden h-[1090px] bg-teal-800 flex-col justify-between items-start md:flex">
        <div className=" p-2.5 flex-col  mt-8 justify-start items-start ml-10 gap-2.5 flex">
            <div className="text-neutral-50 text-[32px] font-bold font-['Roboto Condensed']">MindRest</div>
            <div className="flex-col mt-8 justify-start items-start gap-1 flex">
  </div>
        </div>
        <div className=" w-full p-2.5 bg-teal-900 justify-center items-center gap-[10px] inline-flex">
            <div className="text-white text-sm font-normal font-['Roboto Condensed']">Do You Want to know About Us?</div>
            <div className="w-[87px] h-10 p-1 bg-red-200 rounded-2xl justify-center items-center  flex">
                <div className="text-black text-[11.20px] px-2 font-semibold font-['Roboto']">Click Here!</div>
            </div>
        </div>
    </div>
    <div className=" w-full  bg-neutral-50 flex-col justify-start pt-5 items-center inline-flex">
    <div className="flex justify-end w-[95%]">
    <img src="src/assets/next.svg" className="hover:cursor-pointer" width={70} height={70} />
       
        </div>
      <div className=" w-[383px] flex-col justify-center items-center gap-2 flex">
 <div className=" text-[#909497] text-xl text-center font-semibold font-['Roboto Condensed']">we kindly ask you to provide your professional details</div>
 {iserror && <p className="text-red-500">Please select an answer before proceeding</p>}

  <form onSubmit={handleSubmit} className=' bg-emerald-50 mb-5 px-40'>
        <div className="flex flex-col gap-3 text-teal-900   font-[600] text-base py-5 font-['Roboto']">
          <div>
          <p className="">1.What is Your Gender</p>
          <div className="flex gap-3  font-thin text-sm  font-['Roboto']">
  <input type="radio" name="Gender" onChange={handleChange}  value="Female" required/>
  <label >Female</label>
  <input type="radio"  name="Gender" onChange={handleChange}  value="Male" required/>
  <label >Male</label>
        </div></div>
        <div>
        <p>2.What is your Age Range</p>
        <div className="grid  grid-cols-2 gap-3  font-normal  text-sm font-['Roboto']">
          <div className=''>
  <input type="radio" name="Age" onChange={handleChange}  value="18-25"/>
  <label>18-25</label></div>
<div>
  <input type="radio"  name="Age"  onChange={handleChange} value="26-35"/>
  <label >26-35</label></div>
<div>
<input type="radio" name="Age" onChange={handleChange} value="36-45"/>
  <label >36-45</label></div>
<div>
  <input type="radio"  name="Age" onChange={handleChange} value="37-65"/>
  <label >37-65</label></div>
<div>
<input type="radio"  name="Age" onChange={handleChange} value="<65"/>
  <label >37-65</label></div>
        </div>
<div></div></div>
<div>
        <p>3.In what Mental Health do you Specialize?</p>
        <div className="grid  grid-cols-2 gap-3 w-full font-normal  text-sm font-['Roboto']">
          <div>
  <input type="checkbox" name="speciality" onChange={handleCheckboxChange}  value="Mood Disorder"/>
  <label>Mood Disorder</label></div>
<div>
  <input type="checkbox"  name="speciality"  onChange={handleCheckboxChange} value="Sleep Disorder"/>
  <label >Sleep Disorder</label></div>
<div>
<input type="checkbox" name="speciality" onChange={handleCheckboxChange} value="Anxiety Disorder"/>
  <label >Anxiety Disorder</label></div>
<div>
  <input type="checkbox"  name="speciality" onChange={handleCheckboxChange} value="Eating Disorder"/>
  <label >Eating Disorder</label></div>
<div>
<input type="checkbox"  name="speciality" onChange={handleCheckboxChange} value="Personality Disorder"/>
  <label >Personality Disorder</label>
</div>
<div className=''>
  <input type="checkbox" name="speciality" onChange={handleCheckboxChange}  value="Developement Disorder"/>
  <label>Developement Disorder</label></div>
<div>
  <input type="checkbox"  name="speciality"  onChange={handleCheckboxChange} value="Cogvitive Disorder"/>
  <label >Cogvitive Disorder</label></div>
<div>
<input type="checkbox" name="speciality" onChange={handleCheckboxChange} value="Psyosis"/>
  <label >Psyosis</label></div>
<div>
  <input type="checkbox"  name="speciality" onChange={handleCheckboxChange} value="Substance Related"/>
  <label >Substance Related</label></div>
<div>
<input type="checkbox"  name="speciality" onChange={handleCheckboxChange} value="Schizophernia"/>
  <label >Schizophernia</label>
</div>
<div>
<input type="checkbox"  name="speciality" onChange={handleCheckboxChange} value="Others"/>
  <label >Others</label>
</div>
        </div>
        </div>
        <div>
          <label>4.Enter your Profile Picture</label><br/>
<input type='File'name='profilePic'  onChange={handleChange} className='w-[300px] h-10 text-sm font-light text-black bg-white border-dotted' required ></input><br/>
</div>
<div>
<label >5.Enter your CV</label><br/>
<input type='File'name="cv" onChange={handleChange}  className='w-[300px] h-10 bg-white text-sm font-light text-black border-dotted'required></input><br/>
</div>
<div>
<label>6.Describe About Your Self</label><br/>
<textarea onChange={handleChange}name='Description' placeholder='Write here' className='w-[500px] h-[250px] bg-white font-light text-gray-400 rounded-sm' required></textarea>
        </div>
        </div>
  {/* <div >
    <input  
    className={`self-stretch w-[343px] px-5 py-3 hover:cursor-pointer bg-emerald-100 rounded-[2px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']`}
     />
  </div> */}

  <button type='submit'
    className=' self-stretch w-[150px] px-5 py-2 mb-4 hover:cursor-pointer bg-teal-800 hover:bg-teal-900 text-white rounded-[17px] justify-center items-center gap-2.5 inline-flex  text-sm font-normal '
  > 
    Submit
  </button>

</form>
    </div>
    
  </div>
</div>
      )
    }

 
export  default  TherapistQuestions;
