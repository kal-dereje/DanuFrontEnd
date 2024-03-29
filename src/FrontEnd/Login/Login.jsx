import { FaQuoteLeft } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import endpoint from "../endpoint";
import Peer from "peerjs";

function Login() {
  sessionStorage.clear();
  const formRef = useRef(null); // ref hook for the form
  const navigate = useNavigate();
  const [ismatch, setIsmatch] = useState(true);
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

  // naviagte hook for naviagaion from one page to another
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current); // using formRef cast the info into formdata
    const email = formData.get("email"); // extract email from the formdata
    const password = formData.get("password");
    // extract password from formdata
    try {
      // Create a new instance of Axios
      const response = await axios.post(`${endpoint}/api/user/loginUser`, {
        email,
        password,
      });

      //post request for login
      formRef.current.reset(); //reset the form
      sessionStorage.setItem("token", response.data["token"]);
      sessionStorage.setItem("userID", response.data["user"]["_id"]);
      sessionStorage.setItem("info", JSON.stringify(response.data));
      sessionStorage.setItem(
        "userName",
        response.data["user"]["firstName"] +
          " " +
          response.data["user"]["lastName"]
      );

      const role = response.data["user"]["role"];
      sessionStorage.setItem("role", role);
      const isActive = response.data["user"]["isActive"];
      const attempt = response.data["user"]["attempt"];
      console.log(response.data);
      if (role == "client" && attempt == false) {
        navigate("/ClientWelcomePage");
      } else if (
        role == "client" &&
        attempt == true &&
        response.data.client.therapist != null
      ) {
        sessionStorage.setItem("otherId", response.data.client.therapist);
        navigate("/ClientHomePage");
      } else if (role == "client" && attempt == true) {
        navigate("/Display");
      } else if (role == "therapist" && attempt == false) {
        navigate("/TherapistWelcomePage");
      } else if (role == "therapist" && attempt == true) {
        sessionStorage.setItem(
          "clients",
          JSON.stringify(response.data.therapist.clients)
        );
        console.log("stubbb", sessionStorage.getItem("clients"));
        navigate("/DisplayClients");
      } else if (role == "admin") {
        navigate("/Requests");
      }
      // HILINA , USE navigate("/"); TO GO TO USERS HOME PAGE (CLIENT, ADMIN, THERAPIST)
    } catch (e) {
      setIsmatch(false);
      console.log(e); //HILINA HANDLE THE ERROR(EMAIL OR PASSWORD NO MATCH)
    }
  }
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
    <div className="flex w-full justify-center md:justify-start h-[98vh] ">
      <div className="w-[75%] h-full rounded-3xl  m-2 bg-opacity-80 bg-[url('src/assets/Therapy.webp')] bg-cover ">
        <div className="bg-black hidden bg-opacity-40 rounded-3xl  w-full md1:flex  items-end  h-full pb-10">
          <div className="flex w-[90%]  justify-between">
            <div className=" w-[70%] flex flex-col  p-5">
              <div className="text-white">
                <FaQuoteLeft size={20} />
              </div>
              <div>
                <p className="  text-white  text-xl p-5">
                  {" "}
                  {reviews[currentReviewIndex]?.reviewContent}
                </p>

                <p className="font-semibold text-2xl text-white">{`${reviews[currentReviewIndex]?.client?.firstName} ${reviews[currentReviewIndex]?.client?.lastName}`}</p>
              </div>
            </div>
            <div className="flex gap-14">
              <button onClick={handlePrev}>
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
      <div className="md1:w-[40%] w-[90%] sm:w-[80%] flex justify-center  ">
        <div className="w-[85%]  flex flex-col justify-center gap-1">
          <h2 className=" font-[900] text-sm">MindRest</h2>
          <h1 className=" font-bold text-xl mt-3">LogIn</h1>
          <p className="font-[600] text-sm text-[#717477]">
            {" "}
            Log In Today For a Jorney of Wellness
          </p>
          {!ismatch && (
            <p className="text-red-500">
              Your Email or Passwords Is not correct!
            </p>
          )}
          <form ref={formRef} className="flex flex-col gap-5 mt-3 ">
            <input
              className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]"
              type="email"
              name="email"
              placeholder="Email"
            ></input>

            <input
              className=" border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]"
              type="password"
              name="password"
              placeholder="Password"
            ></input>
            <div className="flex flex-col gap-3 items-center ">
              <button
                onClick={handleSubmit}
                className="w-[90%] text-white bg-black flex font-semibold text-xs justify-center py-2 rounded-2xl"
              >
                {" "}
                Login in to your account
              </button>
              <div className="flex gap-2 pt-6">
                {" "}
                <p className="font-semibold text-xs text-[#717477]">
                  {" "}
                  Dont have an account?
                </p>{" "}
                <Link
                  className="text-xs font-bold  border-black  border-b-2"
                  to="/"
                >
                  SignUp
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
