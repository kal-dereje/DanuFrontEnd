import Login from "./FrontEnd/Login/Login";
import Profile from "./FrontEnd/Profile page/Profile";
import Display from "./FrontEnd/Display Therapist/Display";
import Home2 from "./FrontEnd/Home/Home2";
import Home from "./FrontEnd/Home/Home";
import Verification from "./FrontEnd/Signup/VerfifcationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignup from "./FrontEnd/Signup/ClientSignup";
import TherapistSignup from "./FrontEnd/Signup/TherapistSignup";
import AboutUs from "./FrontEnd/AboutUs/AboutUs";
import Guidelines from "./FrontEnd/Guidelines/Guidelines";

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
        <Route path="/Home2" element={<Home2 />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
