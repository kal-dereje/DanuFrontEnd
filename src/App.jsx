import Login from "./FrontEnd/Login/Login";
import Profile from "./FrontEnd/Profile page/profile";
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
import AboutUs from "./FrontEnd/AboutUs/AboutUs";
import Guidelines from "./FrontEnd/Guidelines/Guidelines";
import ContactUsPage from "./FrontEnd/ContactUs/ContactUs";
import ChatPage from "./FrontEnd/Chat/chat";
import Requests from "./FrontEnd/AdminPage/Requests";
import AdminMessages from "./FrontEnd/AdminPage/AdminMessages";
import DisplayClient from "./FrontEnd/Therapist/Display Client/Display";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ClientSignup" element={<ClientSignup />} />
        <Route path="/TherapistSignup" element={<TherapistSignup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Verification" element={<Verification />} />
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/Guidelines" element={<Guidelines />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Display" element={<Display />}></Route>
        <Route path="/Diagnosis" element={<Diagnosis />}></Route>
        <Route path="/DisplayClients" element={<DisplayClient />}></Route>
        <Route path="/Home2" element={<Home />}></Route>
        <Route path="/Details" element={<Details />}></Route>
        <Route path="/Contact" element={<ContactUsPage />}></Route>
        <Route path="/Chat" element={<Requests />}></Route>
        <Route path="/AdminMessages" element={<AdminMessages />}></Route>
        <Route path="/ManageAccounts" element={<DisplayUser />}></Route>
        <Route path="/" element={<Home2 />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
