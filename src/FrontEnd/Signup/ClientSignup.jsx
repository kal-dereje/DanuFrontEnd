import { FaQuoteLeft } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import endpoint from "../endpoint";

function ClientSignup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [validmessage, setValidmessage] = useState("");
  const [axioerror, setAxioserror] = useState(false);
  const [ismatch, setIsmatch] = useState(true);
  const [isvalid, setIsvalid] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const handleNext = () => {
    setCurrentReviewIndex((currentReviewIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentReviewIndex(
      (currentReviewIndex - 1 + reviews.length) % reviews.length
    );
  };
  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword)
      setIsvalid(false);
    else setIsvalid(true);
  };

  const checkPasswords = () => {
    if (password !== confirmPassword) setIsmatch(false);
    else setIsmatch(true);
  };
  // Create a ref for the form element
  const formRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    validateInputs();
    checkPasswords();
    if (ismatch && isvalid) {
      // Access the form and its elements using the ref
      const formData = new FormData(formRef.current);
      // Retrieve the input value
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const password = formData.get("password");
      const role = "client";

      // Make a POST request using Axios to verify client email
      try {
        const response = await axios.post(
          `${endpoint}/api/sendEmail/verification`,
          { email }
        );
        console.log(response.data);
        //create a dictionary to store user information
        const data = { firstName, lastName, email, password, role };
        setValidmessage(true);
        //navigate to verifaction page and also passing the user information
        navigate("/Verification", { state: data });
      } catch (error) {
        // , HERE ADD SOME KIND OF INFORMATIVE ANIMATION OR ....
        if (error.response.status == 409) {
          setAxioserror(409);
        }
      }

      // resetting the form
      setFirstname("");
      setEmail("");
      setLastname("");
      setConfirmPassword("");
      setPassword("");
      formRef.current.reset();
    } else {
      setIsvalid(() => true);
      setIsmatch(() => true);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Make a GET request to fetch the user Reviews
        const response = await axios.get(
          `${endpoint}/api/review/getAllReviews`
        );

        setReviews(response.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };

    // Call the function to fetch user reviews
    fetchReviews();
  }, []);
  return (
    <div className="flex w-full  justify-center  h-[98vh] ">
      <div className="w-[75%] h-full rounded-3xl  m-2 bg-opacity-80 bg-[url('src/assets/Therapy2.jpg')] bg-cover ">
        <div className="bg-black hidden bg-opacity-40 rounded-3xl  w-full md1:flex  items-end  h-full pb-10">
          <div className="flex w-[90%]  justify-between">
            <div className=" w-[70%] flex flex-col  p-5">
              <div className="text-white">
                <FaQuoteLeft size={20} />
              </div>
              <div>
                <p className="  text-white text-lg p-5">
                  {" "}
                  {reviews[currentReviewIndex]?.reviewContent}
                </p>

                <p className="font-semibold text-2xl text-white">{`${reviews[currentReviewIndex]?.client?.firstName} ${reviews[currentReviewIndex]?.client?.lastName}`}</p>
              </div>
            </div>
            <div className="flex gap-14">
              <button onClick={handlePrev}>
                <img
                  src="src/assets/button left.svg"
                  width="30px"
                  height="30px"
                ></img>
              </button>
              <button onClick={handleNext}>
                <img
                  src="src/assets/button right.svg"
                  width="30px"
                  height="30px"
                ></img>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md1:w-[40%] md:w-[70%] w-[90%] sm:w-[80%] flex  justify-center ">
        <div className="w-[85%]  flex flex-col justify-center gap-1">
          <h2 className=" font-[900] text-sm">MindRest</h2>
          <h1 className=" font-bold text-xl mt-3">Create new account</h1>
          <p className="font-[600] text-sm text-[#717477]">
            {" "}
            Sign Up Today For a Jorney of Wellness
          </p>
          <form ref={formRef} className="flex flex-col gap-5 mt-8 ">
            {!ismatch && (
              <p className="text-red-500">Passwords do not match!</p>
            )}
            {axioerror == 409 && (
              <p className="text-red-500">Email already in use!</p>
            )}
            {!isvalid && (
              <p className="text-red-500">
                Invalid input! Please enter valid input.
              </p>
            )}
            {validmessage && (
              <p className="text-green-500">
                thank you for Signing up we will send ypu verification code
                soon.
              </p>
            )}

            <input
              className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            ></input>
            <input
              className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
            ></input>
            <input
              className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className={`border-b-2 border-[#717477] border-opacity-[0.15] w-[85%] ${
                !ismatch ? "border-red-500" : ""
              }`}
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password "
            ></input>
            <input
              className={`border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]  ${
                !ismatch ? "border-red-500" : ""
              }`}
              type="password"
              value={confirmPassword}
              name="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password "
            ></input>
            <div className="flex flex-col gap-3 items-center ">
              <button
                onClick={handleSubmit}
                className="w-[90%] text-white bg-black flex justify-center py-1 rounded-2xl"
              >
                {" "}
                Signup
              </button>
              <div className="flex gap-2 pt-6">
                {" "}
                <p className="font-semibold text-xs text-[#717477]">
                  {" "}
                  Already have an account?
                </p>
                <Link
                  className="text-xs font-bold  border-black  border-b-2"
                  to="/Login"
                >
                  LogIn
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientSignup;
