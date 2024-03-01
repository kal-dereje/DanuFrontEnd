import Login from "./FrontEnd/Login/Login";
import Profile from "./FrontEnd/Therapist/Therapist Profile/Profile";
import Display from "./FrontEnd/Display Therapist/Display";
import Details from "./FrontEnd/Display Therapist/MoreDetails";
import Diagnosis from "./FrontEnd/Therapist/Display Client/Diagnosis";
import DisplayUser from "./FrontEnd/AdminPage/Manage Accounts/Display";
import Home2 from "./FrontEnd/Home/Home2";
import Home from "./FrontEnd/Home/Home";
import Verification from "./FrontEnd/Signup/VerfifcationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignup from "./FrontEnd/Signup/ClientSignup";
import TherapistSignup from "./FrontEnd/Signup/TherapistSignup";
import ClientWelcomeForm from "./FrontEnd/Form/ClientForm/welcomeFrom";
import TherapistWelcomeForm from "./FrontEnd/Form/TherapistForm/welcomeForm";
import ClientQuestionPage from "./FrontEnd/Form/ClientForm/QuestionPage";
import TherapistQuestionPage from "./FrontEnd/Form/TherapistForm/TherapistQuestions";
import CheckboxQuestionPage from "./FrontEnd/Form/ClientForm/QuestionPageCheckbox";
import { useState } from "react";
import Chat from "./FrontEnd/Chat/Chat";
import VoiceCall from "./FrontEnd/VoiceCall/VoiceCall";
import VideoChat from "./FrontEnd/VideoChat/videoChat";
import Guidelines from "./FrontEnd/Guidelines/Guidelines";
import Header from "./FrontEnd/Home/header";
import AboutUs from "./FrontEnd/AboutUs/AboutUs";
import Schedule from "./FrontEnd/Display Therapist/Schedule";
import ContactUsPage from "./FrontEnd/ContactUs/ContactUs";
import Payment from "./FrontEnd/Payment/payment";
import VerifyPayment from "./FrontEnd/Payment/VerifyPayment";

import Requests from "./FrontEnd/AdminPage/Requests";
import AdminMessages from "./FrontEnd/AdminPage/AdminMessages";
import DisplayClient from "./FrontEnd/Therapist/Display Client/Display";
import AdminPage from "./FrontEnd/AdminPage/AdminPage";
const ClientQuestions = [
  {
    question: "What is your Gender identity?",
    key: "gender",
    answers: ["Male", "Female"],
  },
  {
    question: "What  is the range of your age ?",
    key: "age",
    answers: ["18-25", "26-40", "40-55", "55-65", "above 65"],
  },
  {
    question: "What is your relationship status?",
    key: "relationship_status",
    answers: ["Single", "In relationship", "Married", "Divorced", "Widowed"],
  },
  {
    question: "Feeling down depressed or hopeless?",
    key: "feeling_down_depressed_hopeless",
    answers: [
      "Not at all",
      "Several Days",
      "More than half the days",
      "Nearly everyday",
    ],
  },
  {
    question: "Have you ever been in therapy before?",
    key: "been_in_therapy",
    answers: [" Yes", "No"],
  },
  {
    question: "How would you rate your eating habits?",
    key: "current_eating_habits",
    answers: ["Good", "Fair", "Poor"],
  },
  {
    question: "Are you  experiencing overwhelming sadness,grief,or depression?",
    key: "overwhelming_sadness_grief_depression",
    answers: ["No", "Yes"],
  },
  {
    question: "Little interest or pleasure in doing things?",
    key: "little_interest_pleasure",
    answers: [
      "Not at all",
      "Several Days",
      "More than half te days",
      "Nearly everyday",
    ],
  },
  {
    question:
      "Thoughts that you would be better off dead or hurting yourself in some way?",
    key: "thought_of_dying",
    answers: [
      "Not at all",
      "Several Days",
      "More than half te days",
      "Nearly everyday",
    ],
  },
  {
    question: "Are you currently employed?",
    key: "currently_employed",
    answers: ["No", "Yes"],
  },
  {
    question: "How often do you drink alcohol ?",
    key: "drinks_alcohol",
    answers: ["Never", "InFrequently", "Monthly", "Weekly", "Daily"],
  },
  {
    question: "When was the last time you thought about suicide?",
    key: "thought_about_suicide",
    answers: [
      "Never",
      "A year Ago ",
      "3 month ago",
      "A month ago",
      "Over 2 weeks ago",
      "In last weeks",
    ],
  },
  {
    question: "Are you currently experiencing anxiety?",
    key: "currently_experiencing_anxiety_panic_attack_or_phobias",
    answers: ["Yes", "No"],
  },
  {
    question: "Poor appetite or overeating?",
    key: "poor_appetite_or_overeating",
    answers: [
      "Not at all",
      "Several Days",
      "More than half te days",
      "Nearly everyday",
    ],
  },
  {
    question: "Are you currently taking any medication?",
    key: "takes_any_medication",
    answers: ["Yes", "No"],
  },
  {
    question: "How would you rate your current sleeping habits?",
    key: "sleeping_habits",
    answers: ["Good", "Fair", "Poor"],
  },
  {
    question: "Are you currently experiencing any chronic pain?",
    key: "any_chronic_pain",
    answers: ["Yes", "No"],
  },
];
const ClientCheckBoxQuestions = [
  {
    questionindex: 17,
    question: "Please Mark that apply all?",
    answers: [
      "Im a student",
      " Im a veteran",
      "Im disabled",
      "Im Unemployed",
      "Im Employed But my income is low",
    ],
  },
  {
    questionindex: 18,
    question: "What led you to consider therapy today?",
    answers: [
      "I've been feeling depressed",
      "I feel anxious or overwhelmed",
      "My mood is interfering with my job/school performance",
      "I struggle with building or maintaining relationships",
      "I am grieving",
      "I can't find purpose and meaning in my life",
      "I have experienced trauma",
      "I need to talk through a specific challenge",
      "I want to gain self confidence",
      "I want to improve myself but I don't know where to start",
      "Recommended to me (friend, family, doctor)",
      " Just exploring ",
      "Other",
    ],
  },
  {
    questionindex: 19,
    question:
      "What are your expectations from your therapist? A therapist who...?",
    answers: [
      "Listens",
      "Explores my past",
      "Teaches me new skills",
      "Challenges my beliefs",
      "Assigns me homework",
      "Guides me to set goals",
      "Proactively checks in with me",
      "Others",
    ],
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ClientSignup" element={<ClientSignup />} />
        <Route path="/TherapistSignup" element={<TherapistSignup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/ClientWelcomePage" element={<ClientWelcomeForm />} />
        <Route path="/Guidelines" element={<Guidelines />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Home2" element={<Home2 />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Display" element={<Display />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/VerifyPayment" element={<VerifyPayment />} />
        <Route path="/AdminPage" element={<AdminPage />} />

        <Route
          path="/TherapistWelcomePage"
          element={<TherapistWelcomeForm />}
        />
        <Route
          path="/TherapistQuestionPage"
          element={<TherapistQuestionPage />}
        />
        <Route path="/Videochat" element={<VideoChat />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/TherapistWelcomePage"
          element={<TherapistWelcomeForm />}
        />
        <Route
          path="/TherapistQuestionPage"
          element={<TherapistQuestionPage />}
        />
        {ClientQuestions.map((questionData, index) => (
          <Route
            key={index + 1}
            path={`/ClientFormPage${index + 1}`}
            element={
              <ClientQuestionPage
                question={questionData.question}
                keys={questionData.key}
                answers={questionData.answers}
                backLink={`/ClientFormPage${index}`}
                nextLink={`/ClientFormPage${index + 2}`}
              />
            }
          />
        ))}

        {ClientCheckBoxQuestions.map((questionData) => (
          <Route
            key={questionData.questionindex + 1}
            path={`/ClientFormPage${questionData.questionindex + 1}`}
            element={
              <CheckboxQuestionPage
                question={questionData.question}
                answers={questionData.answers}
                backLink={`/ClientFormPage${questionData.questionindex}`}
                nextLink={`/ClientFormPage${questionData.questionindex + 2}`}
              />
            }
          />
        ))}

        <Route path="/" element={<Header />}></Route>
        <Route path="/Diagnosis" element={<Diagnosis />}></Route>
        <Route path="/DisplayClients" element={<DisplayClient />}></Route>
        <Route path="/Home2" element={<Home />}></Route>
        <Route path="/Details" element={<Details />}></Route>
        <Route path="/Contact" element={<ContactUsPage />}></Route>
        <Route path="/Requests" element={<Requests />}></Route>
        <Route path="/AdminMessages" element={<AdminMessages />}></Route>
        <Route path="/ManageAccounts" element={<DisplayUser />}></Route>
        <Route path="/" element={<Home2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
