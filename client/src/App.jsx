import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Detail from "./views/Detail/Detail.jsx";
import Form from "./views/Form/Form.jsx";
import Home from "./views/Home/Home.jsx";
import LandingPage from "./views/LandingPage/LandingPage.jsx";

axios.defaults.baseURL = "http://localhost:3001";
function App() {
  return (
    <div>
      <Routes>
        <Route exat path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
