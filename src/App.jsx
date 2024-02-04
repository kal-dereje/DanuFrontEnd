import Home from "./FrontEnd/Home/Home";
import Header from "./FrontEnd/Home/header";
import Form from "./FrontEnd/Form/form1";
import Welocme from "./FrontEnd/Form/welcomeFrom";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./FrontEnd/Signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}>

        <Route path="/form1" element={<Form />} />
          </Route>
      </Routes>
    
    </BrowserRouter>
   
    
  );
}

export default App;
