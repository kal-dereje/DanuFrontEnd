import { FaQuoteLeft } from "react-icons/fa";
import { useState ,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import endpoint from "../endpoint";
function ClientSignup() {
  const navigate = useNavigate();
  const location = useLocation(); //helps to get current route location
  const data = location.state;
  const [axioerror, setAxioserror] = useState("");
  const [codematch, setCodematch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [verify, setVerify] = useState(""); //for verfication input
  const handleNext = () => {
    setCurrentReviewIndex((currentReviewIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentReviewIndex((currentReviewIndex - 1 + reviews.length) % reviews.length);
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
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a GET request to get verification for that user email
    try {
      let response = await axios.get(
        `${endpoint}/api/verification/${data.email}`
      );

      const verCode = response.data.verificationCode; // is sucessfully fetched assign the value to verCode

      //compare user input verification code and the exact code
      if (verify == verCode) {
        //now create the user in the database
        let response = await axios.post(
          `${endpoint}/api/user/createUser`,
          data
        );
        setCodematch(true); //HILINA , MAKE SURE IT HANDLE MOST CASES DO SOME ANIMATION /////////////////////////////////
        console.log(response.data);
        //navigate to Loging page
        navigate("/Login");
      } else {
        setAxioserror(true); ////HILINA , MAKE SURE IT HANDLE MOST CASES DO SOME ANIMATION /////////////////////////////////
      }
    } catch (error) {
      ////HILINA , MAKE SURE IT HANDLE MOST CASES HANDLE ERROR //////////////////
      console.error("Axios error:", error);
    }
  };
  return (
    <div className="flex w-full  justify-center  h-[98vh] ">
      <div className="w-[75%] h-full rounded-3xl  m-2 bg-opacity-80 bg-[url('src/assets/talk_therapy.jpeg.webp')] bg-cover ">
          <div className="bg-black hidden bg-opacity-20 rounded-3xl  w-full md1:flex  items-end  h-full pb-10">   
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
            <button
            onClick={handlePrev}
            >
              {" "}
              <img
                src="src/assets/button left.svg"
                width="30px"
                height="30px"
              ></img>
            </button>
            <button onClick={handleNext}>
              {" "}
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
          <div className="flex  text-center  items-center gap-3">
            <h2 className=" font-[900] text-lg">MindRest</h2>
            <img src="src/assets/message.svg" width={40} height={40}></img>
          </div>

          <h1 className=" font-bold text-xl text-[#88CAC9] mt-3">
            Verify Its you!{" "}
          </h1>
          <p className="font-[600] text-sm text-[#717477]">
            {" "}
            Thank you for choosing Mindrest for Your service! we have sent
            verification code to your email.Please check your inbox and enter
            the code below.
          </p>
          {axioerror && (
            <p className="text-red-500">
              Incorrect Verification code please try again!
            </p>
          )}
          {codematch && (
            <p className="text-green-500">verification code matches! </p>
          )}

          <h1 className=" font-bold text-xl text-[#577a7a] text-center mt-3">
            5 Digits Code <sup>*</sup>
          </h1>

          <div className="flex flex-col items-center ">
            <input
              className=" border-2 text-center border-[#717477] py-3 border-opacity-[0.15] w-[85%]"
              type="text"
              name="verify"
              onChange={(e) => {
                setVerify(e.target.value);
              }}
              placeholder="Enter 5 Digit code"
              value={verify}
            ></input>

            <button
              onClick={handleSubmit}
              className="w-[40%] text-white mt-3 bg-black flex justify-center py-1 rounded-2xl"
            >
              {" "}
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSignup;
