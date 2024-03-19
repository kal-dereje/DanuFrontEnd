import axios from "axios";
import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import endpoint from "../endpoint";
import ClientHeader from "../Home/ClientHeader";
import Header2 from "../Home/header2";
import Header from "../Home/header";
const ContactUsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    senderUserId: sessionStorage.getItem("userID"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the server
      const response = await axios.post(
        `${endpoint}/api/contactUs/sendContactUs`,
        formData
      );

      alert("Sent");
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
    setFormData((prev) => {
      return { ...prev, name: "", email: "", message: "" };
    });
  };

  return (
    <>
      {sessionStorage.getItem("role") == "client" && <ClientHeader />}
      {sessionStorage.getItem("role") == "therapist" && <Header2 />}
      {sessionStorage.getItem("role") == undefined && <Header />}
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="hover:cursor-pointer  m-12  transition-transform transform hover:scale-110"
      >
        <img className="  " src=" src/assets/client landing/back.svg"></img>
      </button>{" "}
      <div className=" flex items-center justify-center ">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-600 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-600 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg hover:bg-[#F2894E] bg-[#045257]  text-white py-2 px-4  focus:outline-none focus:bg-[#045257]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
