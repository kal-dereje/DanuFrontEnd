import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import endpoint from "../../endpoint";
import axios from "axios";
const QuestionPage = ({ question, keys, answers, nextLink, currentLink }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const urlPageNumber = getPageNumberFromUrl(window.location.href);
  const [currentIndex, setCurrentIndex] = useState(urlPageNumber || 0);
  const [allQuestionsAndAnswers, setAllQuestionsAndAnswers] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState([]);
  const userID = sessionStorage.getItem("userID");
  const navigate = useNavigate();
  async function submitForm() {
    try {
      // Create a new instance of Axios
      const response = await axios.post(`${endpoint}/api/client/createClient`, {
        questionAnswer,
        userID,
      });

      console.log(response.data);
      alert("your data is sucessfully saved, you will be redirected to login");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }
  const numberToOrdinalWord = (num) => {
    switch (num) {
      case 1:
        return "First";
      case 2:
        return "Second";
      case 3:
        return "Third";
      case 4:
        return "Fourth";
      case 5:
        return "Fifth";
      case 6:
        return "Sixth";
      case 7:
        return "Seventh";
      case 8:
        return "Eighth";
      case 9:
        return "Nineth";
      case 10:
        return "Tenth";
      case 11:
        return "Eleventh";
      case 12:
        return "Twelveth";
      case 13:
        return "Thirteenth";
      case 14:
        return "Fourtheenth";
      case 15:
        return "Fivetheenth";
      case 16:
        return "Sixteenth";
      case 17:
        return "Seventeenth";
      case 18:
        return "Eightheenth";
    }
  };
  const onboardingData = Array.from({ length: 18 }, (_, i) => ({
    title: `This is the ${numberToOrdinalWord(i + 1)} Page on boarding page`,
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
    questionAnswer.push(answer);
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
      </div>
      <div className=" w-full  h-[100vh] bg-neutral-50 flex-col justify-center md:justify-center  py-20 gap-16 items-center inline-flex">
        <div className="flex justify-between w-[95%]">
          <button
            onClick={() => {
              questionAnswer.pop();
              questionAnswer.pop();
              navigate(-1);
            }}
          >
            <img
              src="src/assets/back.svg"
              className="hover:cursor-pointer"
              width={70}
              height={70}
            />
          </button>
          <Link
            to={nextLink}
            onClick={(e) => {
              if (selectedAnswer == null) {
                setErrorMessage(true);
                e.preventDefault();
              } else {
                handleForm(question, keys, selectedAnswer);
                if (urlPageNumber === "/ClientFormPage17") {
                  console.log(urlPageNumber);
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
            <div className="w-full text-black font-bold text-2xl font-['Roboto']">
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
            <button
              onClick={(e) => {
                if (selectedAnswer == null) {
                  e.preventDefault();
                  setErrorMessage(true);
                } else {
                  handleForm(question, keys, selectedAnswer);
                  if (nextLink === "/ClientFormPage18") {
                    // Log all questions and answers
                    submitForm();
                  } else {
                    navigate(nextLink);
                  }
                }
              }}
            >
              <button className="w-[100px] px-5 py-3 hover:cursor-pointer bg-teal-800 hover:bg-teal-900 text-white rounded-[17px] justify-center items-center gap-2.5 inline-flex  text-sm font-normal ">
                {currentLink === "/ClientFormPage17" ? "Submit" : "Next"}
              </button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;

const getPageNumberFromUrl = (url) => {
  const match = url.match(/ClientFormPage(\d+)/);
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
