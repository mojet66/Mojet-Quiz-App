import "./App.css";
import Quizpage from "./pages/Quizpage";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/quiz" element={<Quizpage />} />
      </Routes>
    </>
  );
}

export default App;
