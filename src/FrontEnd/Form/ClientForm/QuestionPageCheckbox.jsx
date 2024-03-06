import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const QuestionPageCheckbox = ({ question, answers, nextLink }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const urlPageNumber = getPageNumberFromUrl(window.location.href);
  const [currentIndex, setCurrentIndex] = useState(urlPageNumber || 0);
  const [allQuestionsAndAnswers, setAllQuestionsAndAnswers] = useState([]);
  const onboardingData = Array.from({ length: 21 }, (_, i) => ({
    title: `This is the ${i + 1} onboarding page`,
    imgSrc: "src/assets/Vector.png",
  }));
  //handle Checkbox click
  const handleCheckboxClick = (answer) => {
    if (selectedAnswers.includes(answer)) {
      setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
    } else {
      setSelectedAnswers([...selectedAnswers, answer]);
    }
  };
  {
    allQuestionsAndAnswers.map((item, index) => (
      <div key={index}>
        <p>Question: {item.question}</p>
        <p>Answer: {item.answer}</p>
      </div>
    ));
  }
  //Form handeling
  const handleForm = (question, answer) => {
    setAllQuestionsAndAnswers([
      ...allQuestionsAndAnswers,
      { question, answer },
    ]);
    setSelectedAnswers([]);
    setErrorMessage(false);
  };

  useEffect(() => {
    setCurrentIndex(urlPageNumber);
  }, [urlPageNumber]);

  const start = Math.floor(currentIndex / 7) * 7;
  const visibleData = onboardingData.slice(start, start + 7);
  //Display bording data

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
              if (selectedAnswers.length === 0) {
                e.preventDefault();
                setErrorMessage(true);
              } else {
                handleForm(question, selectedAnswers);
                if (nextLink === "/ClientFormPage21") {
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
          {errorMessage && (
            <p className="text-red-500">
              Please select an answer before proceeding
            </p>
          )}
          <div className=" grid-cols-2 justify-center items-start gap-[15px] ">
            {answers.map((answer, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={answer}
                  onChange={() => handleCheckboxClick(answer)}
                  checked={selectedAnswers.includes(answer)}
                />
                <label>{answer}</label>
              </div>
            ))}
          </div>
          <Link
            to={nextLink}
            onClick={(e) => {
              if (selectedAnswers.length === 0) {
                e.preventDefault();
                setErrorMessage(true);
              } else {
                handleForm(question, selectedAnswers);
                if (nextLink === "/ClientFormPage21") {
                  // Log all questions and answers
                  console.log(allQuestionsAndAnswers);
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
  );
};

export default QuestionPageCheckbox;

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
