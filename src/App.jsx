// import Chat from "./FrontEnd/Chat";
// import TalktoJulie from "./FrontEnd/Talktojulie";
// import Schedule from "./FrontEnd/schedule";
 import Home from "./FrontEnd/Home";
import Header from "./FrontEnd/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        </Route>
      </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
