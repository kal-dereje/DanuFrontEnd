import Login from "./FrontEnd/Login/Login";
import Header from "./FrontEnd/Home/header";
import Verification from "./FrontEnd/Signup/VerfifcationPage";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ClientSignup from "./FrontEnd/Signup/ClientSignup";
import TherapistSignup from "./FrontEnd/Signup/TherapistSignup";
import WelcomeFrom from "./FrontEnd/Form/ClientForm/welcomeFrom";
import QuestionPage from "./FrontEnd/Form/ClientForm/QuestionPage";
const questions = [
  { question: "What is your Gender identity?", answers: ["Male", "Female"] },
  { question: "What  is the range of your age ?", answers: ["18-25", "26-40","40-55","55-65","above 65"] },
  { question: "What is your relationship status?", answers: ["Single", "In relationship","Married","Divorced","Widowed"] },
  { question: "Feeling down depressed or homeless?", answers: ["Not at all", "Several Days","More than half te days","Nearly everyday"] },
  { question: "Have you ever been in therapy before?", answers: [" yes", "No",] },
  { question: "How would you rate your eating habits?", answers: ["Good", "Fair","Poor"] },
  { question: "Are you  experiencing overwhelming sadness,grief,or depression?", answers: ["No", "Yes",] }, 
  { question: "Little interest or pleasure in doing things?", answers: ["Not at all", "Several Days","More than half te days","Nearly everyday"] },
  { question: "Thoughts that you would be better off dead or hurting yourself in some way?", answers: ["Not at all", "Several Days","More than half te days","Nearly everyday"] },
  { question: "Are you currently employed?", answers: ["No", "Yes"] },
  { question: "How often do you drink alcohol ?", answers: ["Never", "InFrequently","Monthly","Weekly","Daily"] },
  { question: "When was the last time you thought about suicide?", answers:["Never", "A year Ago ","3 month ago","A month ago","Over 2 weeks ago","In last weeks"]  },
  { question: "Are you currently experiencing anxiety?", answers: ["Yes", "No"] },
  { question: "Poor appetite or overeating?", answers:["Not at all", "Several Days","More than half te days","Nearly everyday"] },
  { question: "Are you currently taking any medication?", answers:["Yes", "No"]},
  { question: "How would you rate your current sleeping habits?", answers: ["Good", "Fair","Poor"] },
  { question: "Are you currently experiencing any chronic pain?", answers: ["Yes", "No"] },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ClientSignup" element={<ClientSignup />} />
        <Route path="/TherapistSignup" element={<TherapistSignup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/FormPage0" element={<WelcomeFrom />} />
        {questions.map((questionData, index) => (
      <Route key={index + 1} path={`/FormPage${index + 1}`} element={
        <QuestionPage
          question={questionData.question}
          answers={questionData.answers}
          backLink={`/FormPage${index}`}
          nextLink={`/FormPage${index + 2}`}
        />}
      />
    ))}

        <Route path="/" element={<Header />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
