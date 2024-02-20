import Login from "./FrontEnd/Login/Login";
import Header from "./FrontEnd/Home/header";
import Verification from "./FrontEnd/Signup/VerfifcationPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignup from "./FrontEnd/Signup/ClientSignup";
import TherapistSignup from "./FrontEnd/Signup/TherapistSignup";
import VideoChat from "./FrontEnd/VideoChat/videoChat";

function App() {
  return (
    <VideoChat />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/ClientSignup" element={<ClientSignup />} />
    //     <Route path="/TherapistSignup" element={<TherapistSignup />} />
    //     <Route path="/Login" element={<Login />} />
    //     <Route path="/Verification" element={<Verification />} />
    //     <Route path="/" element={<Header />}></Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
