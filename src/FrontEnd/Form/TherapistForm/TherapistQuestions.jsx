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
    console.log(formState);
  };
    return (   
<div className="w-full h-full bg-blue-100 justify-start items-start inline-flex">
    <div className="w-full md:w-[35%] hidden h-full bg-teal-800 flex-col justify-between items-start md:inline-flex">
        <div className="self-stretch grow shrink basis-0 p-2.5 flex-col  mt-8 justify-start items-start ml-10 gap-2.5 flex">
            <div className="text-neutral-50 text-[32px] font-bold font-['Roboto Condensed']">MindRest</div>
            <div className="flex-col mt-8 justify-start items-start gap-1 flex">
  </div>
        </div>
        <div className=" w-full h-full p-2.5 bg-teal-900 justify-center items-center gap-[10px] inline-flex">
            <div className="text-white text-sm font-normal font-['Roboto Condensed']">Do You Want to know About Us?</div>
            <div className="w-[87px] h-10 p-1 bg-red-200 rounded-2xl justify-center items-center  flex">
                <div className="text-black text-[11.20px] px-2 font-semibold font-['Roboto']">Click Here!</div>
            </div>
        </div>
    </div>
    <div className=" w-full  h-[100vh] bg-neutral-50 flex-col justify-start pt-5 gap-16 items-center inline-flex">
    <div className="flex justify-end w-[95%]">
    <img src="src/assets/next.svg" className="hover:cursor-pointer" width={70} height={70} />
       
        </div>
      <div className=" w-[383px] flex-col justify-center items-center gap-2 flex">
 <div className=" text-[#91979c] text-sm font-semibold font-['Roboto Condensed']">Help us match you to the right therapist</div>
  <form onSubmit={handleSubmit} className=' bg-gray-100 px-20'>
        <div className="s text-emerald-900  font-semibold text-lg font-['Roboto']">
          <p className="">What is Your gender</p>
          <div className="flex gap-3  font-thin text-sm  font-['Roboto']">
  <input type="radio" name="Gender" onChange={handleChange}  value="Female"/>
  <label for="Female">Female</label>
  <input type="radio"  name="Gender" onChange={handleChange}  value="Male"/>
  <label for="Male">Male</label>
        </div>
        <p>What is your age range</p>
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

        <p>In what MentalHealth do you specialize?</p>
        <div className="grid  grid-cols-2 gap-3  font-normal  text-sm font-['Roboto']">
          <div className=''>
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
  <input type="checkbox" name="speciality" onChange={handleCheckboxChange}  value="Developement Disorder(ADHD,Epilopsy)"/>
  <label>Developement Disorder(ADHD,Epilopsy)</label></div>
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
          <label>Enter your Profile picture</label>
<input type='File'name='profilePic' onChange={handleChange} className='w-[300px] h-10 text-sm bg-gray-100 border-dotted'></input><br/>
<label >Enter your CV</label>
<input type='File'name="cv" onChange={handleChange} className='w-[300px] h-10 bg-gray-100 text-sm border-dotted'></input>
<label>Describe About Your self</label>
<textarea onChange={handleChange}name='Description' className='w-[400px] h-[200px] bg-gray-300 rounded-sm'></textarea>
        </div>
      
  {/* <div >
    <input  
    className={`self-stretch w-[343px] px-5 py-3 hover:cursor-pointer bg-emerald-100 rounded-[2px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']`}
     />
  </div> */}

  <button type='submit'
    className=' self-stretch w-[100px] px-5 py-3 hover:cursor-pointer bg-teal-800 hover:bg-teal-900 text-white rounded-[17px] justify-center items-center gap-2.5 inline-flex  text-sm font-normal '
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
