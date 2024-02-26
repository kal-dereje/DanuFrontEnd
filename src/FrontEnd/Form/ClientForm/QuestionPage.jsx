import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import endpoint from "../../endpoint";
import axios from "axios";
const QuestionPage = ({ question, keys, answers, nextLink }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const urlPageNumber = getPageNumberFromUrl(window.location.href);
  const [currentIndex, setCurrentIndex] = useState(urlPageNumber || 0);
  const [allQuestionsAndAnswers, setAllQuestionsAndAnswers] = useState([]);
  const userID = sessionStorage.getItem("userID");
  const navigate = useNavigate();
  async function submitForm() {
    let questionAnswer = [];
    console.log("submitting form");

    allQuestionsAndAnswers.forEach((obj) => {
      questionAnswer.push(obj.answer);
    });

    try {
      // Create a new instance of Axios
      const response = await axios.post(`${endpoint}/api/client/createClient`, {
        questionAnswer,
        userID,
      });

      console.log(response.data);
      navigate("/Display");
    } catch (e) {
      console.log(e);
    }
  }

  const onboardingData = Array.from({ length: 21 }, (_, i) => ({
    title: `This is the ${i + 1} onboarding page`,
    imgSrc: "src/assets/Vector.png",
  }));
  //Setting theCurrent index
  useEffect(() => {
    setCurrentIndex(urlPageNumber);
  }, [urlPageNumber]);
  // Declaring start index for the url page
  const start = Math.floor((currentIndex - 1) / 7) * 7;
  const visibleData = onboardingData.slice(start, start + 7);

  //Handle click when user choose Answer
  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setErrorMessage("");
  };
  {
    allQuestionsAndAnswers.map((item, index) => (
      <div key={index}>
        <p>Question: {item.question}</p>
        <p>Answer: {item.answer}</p>
      </div>
    ));
  }
  //Handle Form Page when user clicks next Button
  const handleForm = (question, keys, answer) => {
    setAllQuestionsAndAnswers([
      ...allQuestionsAndAnswers,
      { question, keys, answer },
    ]);
    setSelectedAnswer(null);
    setErrorMessage(false);
  };
  return (
    <div className="w-full h-[100vh] bg-white justify-start items-start inline-flex">
      <div className="w-full md:w-[35%] hidden h-full bg-teal-800 flex-col justify-start items-start md:inline-flex">
        <div className="self-stretch grow shrink basis-0 p-2.5 flex-col  mt-8 justify-start items-start ml-10 gap-2.5 flex">
          <div className="text-neutral-50 text-[32px] font-bold font-['Roboto Condensed']">
            MindRest
          </div>
          <div className="flex-col mt-8 justify-start items-start gap-1 flex">
            {visibleData.map((data, index) => (
              <OnboardingPage
                key={index}
                title={data.title}
                imgSrc={data.imgSrc}
                pageNumber={start + index + 1}
              />
            ))}
          </div>
        </div>
        <div className=" w-full self-stretch h-[87px] p-2.5 bg-teal-900 justify-center items-center gap-[10px] inline-flex">
          <div className="text-white text-sm font-normal font-['Roboto Condensed']">
            Do You Want to know About Us?
          </div>
          <div className="w-[87px] h-10 p-1 bg-red-200 rounded-2xl justify-center items-center  flex">
            <div className="text-black text-[11.20px] px-2 font-semibold font-['Roboto']">
              Click Here!
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full  h-[100vh] bg-neutral-50 flex-col justify-center md:justify-center  py-20 gap-16 items-center inline-flex">
        <div className="flex justify-end w-[95%]">
          <Link
            to={nextLink}
            onClick={(e) => {
              if (selectedAnswer == null) {
                setErrorMessage(true);
                e.preventDefault();
              } else {
                handleForm(question, keys, selectedAnswer);
                if (nextLink === "/ClientFormPage18") {
                  // Log all questions and answers
                  console.log(allQuestionsAndAnswers);
                }
              }
            }}
          >
            <img
              src="src/assets/next.svg"
              className="hover:cursor-pointer"
              width={70}
              height={70}
            />
          </Link>
        </div>
        <div className="rounded-[20px] flex-col justify-center items-start gap-8 flex">
          <div className="h-[61px] w-[383px] flex-col justify-center items-center gap-2 flex">
            <div className="self-stretch text-[#91979c] text-sm font-semibold font-['Roboto Condensed']">
              Help us match you to the right therapist
            </div>
            <div className="self-stretch text-black font-bold text-2xl font-['Roboto']">
              {question}
            </div>
          </div>
          <div className="flex-col justify-center items-center gap-[15px] flex">
            {errorMessage && (
              <p className="text-red-500">
                Please select an answer before proceeding
              </p>
            )}

            {answers.map((answer, index) => (
              <button
                className={`w-[343px] px-5 py-3 hover:cursor-pointer ${
                  selectedAnswer === answer
                    ? "bg-teal-800 text-white"
                    : "hover:text-white hover:bg-teal-800 bg-emerald-100"
                } rounded-[27px] justify-start items-center gap-2.5 inline-flex text-black text-sm font-normal font-['Roboto']`}
                value={answer}
                onClick={() => handleClick(answer)}
                key={index}
              >
                {answer}
              </button>
            ))}
            <Link
              to={nextLink}
              onClick={(e) => {
                if (selectedAnswer == null) {
                  e.preventDefault();
                  setErrorMessage(true);
                } else {
                  handleForm(question, keys, selectedAnswer);
                  if (nextLink === "/ClientFormPage18") {
                    // Log all questions and answers
                    submitForm();
                  }
                }
              }}
            >
              <button className="w-[100px] px-5 py-3 hover:cursor-pointer bg-teal-800 hover:bg-teal-900 text-white rounded-[17px] justify-center items-center gap-2.5 inline-flex  text-sm font-normal ">
                {nextLink === "/ClientFormPage21" ? "Submit" : "Next"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;

const getPageNumberFromUrl = (url) => {
  const match = url.match(/FormPage(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

const OnboardingPage = ({ title, imgSrc, pageNumber }) => {
  const urlPageNumber = getPageNumberFromUrl(window.location.href);
  const actualImgSrc =
    pageNumber <= urlPageNumber ? "src/assets/check-circle.svg" : imgSrc;

  return (
    <div className="w-[216.60px] h-[57px] relative">
      <div className="w-[35px] h-[0px] left-[12px] top-[57px] absolute origin-top-left -rotate-90 border border-black"></div>
      <div className="w-[216.60px] h-[35px] left-0 top-0 absolute justify-start items-start gap-[13px] inline-flex">
        <div className="w-[21.60px] h-[21.60px] relative">
          <img src={actualImgSrc} width={20} height={20}></img>
        </div>
        <div className="pt-[3px] justify-center items-center gap-2.5 flex">
          <div className="w-[182px] text-white text-sm font-normal font-['Roboto Condensed']">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};
