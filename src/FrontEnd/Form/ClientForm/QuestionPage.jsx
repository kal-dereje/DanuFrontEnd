import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const QuestionPage = ({ question, keys, answers, nextLink }) => {
  const onboardingData = Array.from({ length: 18 }, (_, i) => ({
    title: `This is the ${i} on boarding page`,
    imgSrc: "src/assets/Vector.png",
  }));
  // Get the page number from the URL
  const urlPageNumber = getPageNumberFromUrl(window.location.href);
  const [currentIndex, setCurrentIndex] = useState(urlPageNumber || 0);

  useEffect(() => {
    // Update the currentIndex when the page number changes
    setCurrentIndex(urlPageNumber);
  }, [urlPageNumber]);
  const visibleData = onboardingData.slice(currentIndex, currentIndex + 8);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setErrorMessage("");
  };

  const handleForm = (question, keys, answer) => {
    console.log(`Question: ${question},Key: ${keys}  Answer: ${answer}`);
    setSelectedAnswer(null);
  };
  return (
    <div className="w-full h-[100vh] bg-white justify-start items-start inline-flex">
      <div className="w-full md:w-[25%] hidden h-full bg-teal-800 flex-col justify-start items-start md:inline-flex">
        <div className="self-stretch grow shrink basis-0 p-2.5 flex-col  mt-8 justify-start items-start ml-10 gap-2.5 flex">
          <div className="text-neutral-50 text-[32px] font-bold font-['Roboto Condensed']">
            MindRest
          </div>
          <div className="flex-col mt-8 justify-start items-start gap-1 flex">
            {visibleData.map((data, i) => (
              <OnboardingPage key={i} {...data} pageNumber={i + 1} />
            ))}
          </div>
        </div>
      </div>
      <div className=" w-full  h-[100vh] bg-neutral-50 flex-col justify-center md:justify-center  py-20 gap-16 items-center inline-flex">
        <div className="flex justify-end w-[95%]">
          <Link
            to={nextLink}
            onClick={(e) => {
              if (selectedAnswer === null) {
                e.preventDefault();
                setErrorMessage(true);
              } else {
                handleForm(question, keys, selectedAnswer);
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
                if (selectedAnswer === null) {
                  e.preventDefault();
                  setErrorMessage(true);
                } else {
                  handleForm(question, keys, selectedAnswer);
                }
              }}
            >
              <button className="w-[100px] px-5 py-3 hover:cursor-pointer bg-teal-800 hover:bg-teal-900 text-white rounded-[17px] justify-center items-center gap-2.5 inline-flex  text-sm font-normal ">
                Next
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

  // Choose the image source based on the page number
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
