import "./App.css";
import Quizpage from "./pages/Quizpage";
import Homepage from "./pages/Homepage";
import Resultpage from "./pages/Resultpage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz" element={<Quizpage />} />
        <Route path="/results" element={<Resultpage />} />
      </Routes>
    </>
  );
}

export default App;
