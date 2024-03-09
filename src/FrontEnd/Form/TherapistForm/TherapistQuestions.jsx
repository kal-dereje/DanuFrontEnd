import React, { useRef } from "react";
import { useState } from "react";
import endpoint from "../../endpoint";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const TherapistQuestions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    gender: "",
    age: "",
    profilePic: null,
    cv: null,

    license: null,
    description: "",
    pricePerHour: 0,
    speciality: [],
    days: [],
  });
  console.log(formState);
  // if (location.state.data) {
  //   setFormState({
  //     ...formState,
  //     gender:
  //     speciality: [...formState.speciality, e.target.value],
  //   });
  // }

  const [iserror, setIsErorr] = useState(false);
  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormState({
        ...formState,
        speciality: [...formState.speciality, e.target.value],
      });
    } else {
      setFormState({
        ...formState,
        speciality: formState.speciality.filter(
          (speciality) => speciality !== e.target.value
        ),
      });
    }
  };
  const handleDaysCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormState({
        ...formState,
        days: [...formState.days, e.target.value],
      });
    } else {
      setFormState({
        ...formState,
        days: formState.days.filter((days) => days !== e.target.value),
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = sessionStorage.getItem("userID");

      const response = await axios.post(
        `${endpoint}/api/therapist/createTherapist`,
        { ...formState, userId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
      navigate("/Login");
    } catch (error) {
      console.log("Error submitting form:", error);
      alert("not submitted");
    }
  };

  return (
    <div className="w-full bg-neutral-50 justify-start items-start inline-flex">
      <div className=" w-full  flex-col justify-start pt-20 gap-1 items-center inline-flex">
        <div className="w-[90%] flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="hover:cursor-pointer  w-[44px] md:w-[90px] md:h-[50px] h-[44px]"
          >
            {" "}
            <img src="src/assets/back.svg"></img>
          </button>
        </div>
        <div>
          <span className="text-orange-400  text-[20px] sm:text-[30px] md:text-[35px] font-bold font-['Roboto Condensed']">
            Hey There,{" "}
          </span>
          <span className="text-teal-900 text-[35px] font-bold font-['Roboto Condensed']">
            Hilina Mastewal
          </span>
          <span className="text-black text-[35px] font-bold font-['Roboto Condensed']">
            {" "}
          </span>
        </div>
        <div className="text-teal-600 opacity-50 text-md sm:text-2xl font-semibold font-['Roboto Condensed']">
          We kindly ask you to provide your professional details
        </div>

        <div className=" md:w-[50%] w-[90%] flex-col justify-center items-center gap-5 flex">
          <form
            onSubmit={handleSubmit}
            className=" bg-white my-10 px-10 md:px-20 border-gray-300 shadow-2xl"
          >
            <div className="s text-teal-700  text-sm sm:text-base font-semibold mt-7 font-['Roboto']">
              <p className="">1.What is Your Gender</p>
              <div className="flex gap-5 mt-2 text-black text-xs font-thin sm:text-sm  font-['Roboto']">
                <input
                  required
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value="Female"
                />
                  <label for="Female">Female</label> {" "}
                <input
                  required
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value="Male"
                />
                  <label for="Male">Male</label>
              </div>
              <p>2.What is your Age </p>
              <div className="grid mt-2 grid-cols-2 gap-5  font-normal  text-sm font-['Roboto']">
                <div className="">
                   {" "}
                  <input
                    required
                    type="number"
                    name="age"
                    onChange={handleChange}
                    value={formState.age}
                    className="border border-gray-200 rounded py-2 text-gray-400 font-thin text-sm w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                </div>
              </div>
              <p>3. Select Available Days</p>
              <div className="grid mt-2 grid-cols-2 gap-5 text-black font-normal text-xs sm:text-sm font-['Roboto']">
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="days"
                    onChange={handleDaysCheckboxChange}
                    value="Monday"
                  />
                    <label>Monday</label>
                </div>
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="days"
                    onChange={handleDaysCheckboxChange}
                    value="Tuesday"
                  />
                    <label>Tuesday</label>
                </div>
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="days"
                    onChange={handleDaysCheckboxChange}
                    value="Wednesday"
                  />
                    <label>Wednesday</label>
                </div>
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="days"
                    onChange={handleDaysCheckboxChange}
                    value="Thursday"
                  />
                    <label>Thursday</label>
                </div>
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="days"
                    onChange={handleDaysCheckboxChange}
                    value="Friday"
                  />
                    <label>Friday</label>
                </div>
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="days"
                    onChange={handleDaysCheckboxChange}
                    value="Saturday"
                  />
                    <label>Saturday</label>
                </div>
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="days"
                    onChange={handleDaysCheckboxChange}
                    value="Sunday"
                  />
                    <label>Sunday</label>
                </div>
              </div>
              <p>4. In what Mental Health do you specialize?</p>
              <div className="grid mt-2 grid-cols-2 gap-5  font-normal text-xs text-black sm:text-sm font-['Roboto']">
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Mood Disorder"
                  />
                    <label>Mood Disorder</label>
                </div>
                <div>
                   {" "}
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Sleep Disorder"
                  />
                    <label>Sleep Disorder</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Anxiety Disorder"
                  />
                    <label>Anxiety Disorder</label>
                </div>
                <div>
                   {" "}
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Eating Disorder"
                  />
                    <label>Eating Disorder</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Personality Disorder"
                  />
                    <label>Personality Disorder</label>
                </div>
                <div className="">
                   {" "}
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Developement Disorder(ADHD,Epilopsy)"
                  />
                    <label>Developement Disorder</label>
                </div>
                <div>
                   {" "}
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Cogvitive Disorder"
                  />
                    <label>Cogvitive Disorder</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Psyosis"
                  />
                    <label>Psyosis</label>
                </div>
                <div>
                   {" "}
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Substance Related"
                  />
                    <label>Substance Related</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Schizophernia"
                  />
                    <label>Schizophernia</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="speciality"
                    onChange={handleCheckboxChange}
                    value="Others"
                  />
                    <label>Others</label>
                </div>
              </div>
              <label> 5. What is your Price/Hour</label>
              <br />
              <input
                type="number"
                min={0}
                name="pricePerHour"
                onChange={handleChange}
                value={formState.pricePerHour}
                className="border border-gray-200 rounded py-2 text-gray-900 font-thin text-sm w-[14rem] sm:w-[20rem] p-1 mb-2"
              />
              <br /> <label>6. Enter your Profile picture</label>
              <br />
              <input
                type="File"
                placeholder=""
                name="profilePic"
                onChange={handleChange}
                className="border mt-2 border-gray-200 rounded py-2 text-gray-400 font-thin text-sm w-[14rem] sm:w-[20rem] p-1 mb-2"
              />
              <br />
              <label>7.Enter your CV</label>
              <br />
              <input
                type="File"
                name="cv"
                onChange={handleChange}
                className="border mt-2 border-gray-200 rounded py-2 text-gray-400 font-thin text-sm w-[14rem] sm:w-[20rem] p-1 mb-2"
              />
              <br />
              <label> 8.Enter your License</label>
              <br />
              <input
                type="File"
                name="license"
                onChange={handleChange}
                className="border mt-2 border-gray-200 rounded py-2 text-gray-400 font-thin text-sm w-[14rem] sm:w-[20rem] p-1 mb-2"
              />
              <br />
              <label>9. Describe About Your self</label>
              <br />
              <textarea
                onChange={handleChange}
                name="description"
                className=" border mt-2 border-gray-200  text-gray-900 font-thin text-sm bg-white rounded w-[90%] h-[250px]  md-2 P-1"
              ></textarea>
            </div>

            <button
              type="submit"
              className=" self-stretch w-[150px] my-5 px-10 py-3 hover:cursor-pointer bg-teal-800 hover:bg-teal-700 active:bg-teal-600 text-white rounded justify-center items-center gap-2.5 inline-flex  text-sm font-normal "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TherapistQuestions;
