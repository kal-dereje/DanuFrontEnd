import { FaQuoteLeft } from "react-icons/fa";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ClientSignup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [isMatch, setIsMatch] = useState(true);
  const [isValid, setIsValid] = useState(true);
  // const[emailformat,setEmailFormat]=useState(true)
  const[axioerror,setAxioserror]=useState(false)
  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setIsValid(false);
      console.log("invalid input")
    } else {
      setIsValid(true);
    }
  };
 
  const checkPasswords = () => {
    if (password !== confirmPassword) {
      console.log("no match password")
      setIsMatch(false);
    } else {
      setIsMatch(true);
    
    }
  };
  
  // const validateEmail = () => {
  //  if (isValid) {
  //     if(email.endsWith('@gmail.com')){
  //    setEmailFormat(true);
  //   }
  //    else{
  //    setEmailFormat(false);
  //    console.log("invalid email");}
  //   }
  // };
  const handleInputSubmit = (e) => {
    validateInputs();
    //validateEmail();
    checkPasswords();
    
   
  };
  // Create a ref for the form element
  const formRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    handleInputSubmit();
    event.preventDefault();
  

    if (isMatch && isValid ) {
      // Access the form and its elements using the ref
      const formData = new FormData(formRef.current);
      // Retrieve the input value
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const password = formData.get("password");
      const role = "client";
          console.log("hiluuuuuuuuuu");

      // Make a POST request using Axios to verify client email
      try {
        const response = await axios.post(
          "http://localhost:5001/api/sendEmail/verification",
          {email}
        );

        //create a dictionary to store user information
        const data = { firstName, lastName, email, password, role };

        //navigate to verifaction page and also passing the user information
        navigate("/Verification", { state: data });
      } catch (error) {

        //HILINA , HERE ADD SOME KIND OF INFORMATIVE ANIMATION OR ....
        setAxioserror(true);

      }

      // resetting the form
      setFirstname("");
      setEmail("");
      setLastname("");
      setConfirmPassword("");
      setPassword("");
      formRef.current.reset();
    }
    else{
      handleInputSubmit();
    }
  };
  return (
    <div className="flex w-full  justify-center  h-[98vh] ">
      <div className="w-[75%] h-full hidden rounded-3xl m-2 md1:flex  pb-10 items-end bg-[url('src/assets/leftSignUp.png')] bg-cover ">
        <div className="flex w-[90%]  justify-between">
          <div className=" w-[70%] flex flex-col  p-5">
            <div className="text-white">
              <FaQuoteLeft size={30} />
            </div>
            <p className="  text-white text-lg p-7">
              {" "}
              This online therapy is a true gem! The therapist are
              compassionate, and the platform is user-friendly.it's been a
              game-changer for my mental well-being .Highly recommend!
            </p>

            <p className="font-semibold text-2xl text-white">Jessica Jemal</p>
          </div>
          <div className="flex gap-14">
            <button>
              {" "}
              <img
                src="src/assets/button left.svg"
                width="30px"
                height="30px"
              ></img>
            </button>
            <button>
              {" "}
              <img src="src/assets/button right.svg" width="30px" height="30px">
              </img>
            </button>
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
            {!isMatch && (<p className="text-red-500">Passwords do not match!</p>)}
            {axioerror && <p className="text-red-500">server problem has occure.</p>}
            {!isValid && <p className="text-red-500">Invalid input! Please enter valid input.</p>}
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
                !isMatch ? "border-red-500" : ""
              }`}
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password "
            ></input>
            <input
              className={`border-b-2 border-[#717477] border-opacity-[0.15] w-[85%]  ${
                !isMatch ? "border-red-500" : ""
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
