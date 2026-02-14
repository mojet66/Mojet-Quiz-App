import "./App.css";
import Quizpage from "./pages/Quizpage";
import Homepage from "./pages/Homepage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Quizpage" element={<Quizpage />} />
        </Routes>
      </Router> */}

      <div className="flex flex-col justify-center items-center h-screen">
        <Homepage />
        {/* <Quizpage /> */}
      </div>
    </>
  );
}

export default App;
