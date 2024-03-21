import { FaQuoteLeft } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import endpoint from "../endpoint";

function ClientSignup() {
  const navigate = useNavigate();
  const [onProgress, setOnProgress] = useState(false);
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
        setOnProgress(true);
        const response = await axios.post(
          `${endpoint}/api/sendEmail/verification`,
          { email }
        );

        //create a dictionary to store user information
        const data = { firstName, lastName, email, password, role };
        setValidmessage(true);
        //navigate to verifaction page and also passing the user information
        navigate("/Verification", { state: data });
      } catch (error) {
        setOnProgress(false);
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
