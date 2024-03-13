import axios from "axios";
import React from "react";

import { useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import endpoint from "../endpoint";

function Payment() {
  const navigate = useNavigate();

  const [onProgress, setOnProgress] = useState(false);
  const location = useLocation();
  function generateTxRef() {
    // Get current timestamp
    const timestamp = new Date().getTime();

    // Generate a random string of characters
    const randomString = Math.random().toString(36).substring(2, 10); // Adjust length as needed

    // Concatenate timestamp and random string to create the transaction reference
    const txRef = timestamp.toString() + "_" + randomString;

    return txRef;
  }

  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    TransactionRef: generateTxRef(),
    Amount: location.state.scheduleInformation.pricePerHour,
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    for (let key in formState) {
      if (
        formState.Email == "" ||
        formState.FirstName == "" ||
        formState.LastName == "" ||
        formState.PhoneNumber == "" ||
        formState.Amount == ""
      ) {
        setError("Please Fill all the provided Inputs ");
        return;
      }
    }

    if (isNaN(formState.Amount)) {
      setError("Amount must be a number");
      return;
    }
    if (isNaN(formState.PhoneNumber)) {
      setError("Phone Number must be a number");
      return;
    }

    setFormState({
      ...formState,
    });
    const scheduleInfo = location.state.scheduleInformation;
    const tnx = {
      firstName: formState.FirstName,
      lastName: formState.LastName,
      email: formState.Email,
      phoneNumber: formState.PhoneNumber,
      amount: formState.Amount,
      tx_ref: formState.TransactionRef,
    };

    const date = {
      year: scheduleInfo.year,
      month: scheduleInfo.month,
      day: scheduleInfo.day,
      startTime: scheduleInfo.startTime,
      endTime: scheduleInfo.endTime,
    };

    const clientUserId = scheduleInfo.clientId;
    const therapistUserId = scheduleInfo.therapistId;

    // Make a POST request using Axios to verify client email
    try {
      setOnProgress(true);
      const response = await axios.post(`${endpoint}/api/payment/chapa`, {
        tnx,
        date,
        clientUserId,
        therapistUserId,
      });

      let res = response.data.response;
      let r = JSON.parse(res);

      const checkout_url = r.data.checkout_url.replace(/\\\//g, "/");

      window.location.href = checkout_url;
      //create a dictionary to store user information
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-neutral-50  justify-center sm:gap-0 items-center flex flex-col">
      <div className="flex w-[90%] justify-start">
       <button
        onClick={() => {
          navigate(-1);
        }}
        className="hover:cursor-pointer    transition-transform transform hover:scale-110"
      >
        <img className="  " src=" src/assets/client landing/back.svg"></img>
      </button></div>
      <div className="w-full bg-neutral-50  flex-col justify-center items-center gap-5 flex">
        <div className="flex-col w-full   justify-center items-center gap-[5px] flex">
          <div>
            <span className="text-black  text-[20px] sm:text-[30px] md:text-[35px] font-bold font-['Roboto Condensed']">
              Hey There,{" "}
            </span>
            <span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">
              MindRest
            </span>
            <span className="text-black text-[35px] font-bold font-['Roboto Condensed']">
              {" "}
            </span>
          </div>
          <div className="text-teal-600 opacity-50 text-2xl font-semibold font-['Roboto Condensed']">
            Let’s Set up Your Payment
          </div>
          <div>
            <div className="flex flex-col sm:px-[7rem] py-5 items-center justify-center">
              <div className="bg-white rounded-lg flex flex-col gap-3 shadow-xl px-7 sm:px-14 py-7 ">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col text-teal-900 ml-4"
                >
                  {error && <p className="text-red-500">{error}</p>}

                  <label className="mb-1 font-semibold">First Name</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formState.FirstName}
                    name="FirstName"
                    className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Last Name </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formState.LastName}
                    name="LastName"
                    className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Email</label>
                  <input
                    type="email"
                    onChange={handleChange}
                    value={formState.Email}
                    name="Email"
                    placeholder="...@gmail.com"
                    className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Phone Number</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formState.PhoneNumber}
                    placeholder="09..."
                    name="PhoneNumber"
                    className="border border-gray-200 rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />
                  <label className="mb-1 font-semibold">Amount</label>
                  <input
                    type="text"
                    value={formState.Amount}
                    disabled
                    name="Amount"
                    className="border border-gray-200  rounded w-[14rem] sm:w-[20rem] p-1 mb-2"
                  />

                  <button
                    type="submit"
                    className="bg-teal-700 hover:bg-teal-800 text-white rounded p-2 mt-5"
                  >
                    Next
                  </button>
                  {onProgress && (
                    <div
                      role="status"
                      className="flex items-center justify-center mt-5"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
