import useQuizStore from "../store/useQuizStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Historypage from "./Historypage";

const Resultpage = () => {
  const navigate = useNavigate();

  const { questions, userAnswers, saveQuizHistory } = useQuizStore();

  const totalQuestions = questions.length;

  // Calculate correct answers
  const correctAnswers = questions.reduce((total, question, index) => {
    if (userAnswers[index] === question.correct_answer) {
      return total + 1;
    }
    return total;
  }, 0);

  // calculate incorrect answers
  const incorrectAnswers = totalQuestions - correctAnswers;

  // Calculate percentage score
  const percentage =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100);

  // Get quiz category and difficulty from the first question (assuming all questions are from the same quiz)
  const category = totalQuestions > 0 ? questions[0].category : "N/A";
  const difficulty = totalQuestions > 0 ? questions[0].difficulty : "N/A";

  // Save quiz result to history on component mount
  useEffect(() => {
    if (questions.length === 0) return;

    const quizResult = {
      id: Date.now(),
      category,
      difficulty,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      percentage,
      date: new Date().toISOString(),
    };
    saveQuizHistory(quizResult);
  }, []);

  // Handle go home
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center bg-linear-to-br from-slate-900 to-slate-800 p-6 min-h-screen">
      <div className="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-xl">
        {/* Title */}
        <h1 className="mb-8 font-bold text-slate-800 text-3xl text-center">
          Quiz Results
        </h1>

        {/* Percentage Score Highlight */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-slate-500 text-sm">Your Score</p>
          <div className="font-extrabold text-blue-600 text-5xl">
            {percentage}%
          </div>
        </div>

        {/* Summary Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg">
            <span className="font-medium text-slate-600">Category</span>
            <span className="font-semibold text-slate-800">{category}</span>
          </div>

          <div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg">
            <span className="font-medium text-slate-600">Difficulty</span>
            <span className="font-semibold text-slate-800">{difficulty}</span>
          </div>

          <div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg">
            <span className="font-medium text-slate-600">Total Questions</span>
            <span className="font-semibold text-slate-800">
              {totalQuestions}
            </span>
          </div>

          <div className="flex justify-between items-center bg-green-100 p-4 rounded-lg">
            <span className="font-medium text-green-700">Correct Answers</span>
            <span className="font-bold text-green-800">{correctAnswers}</span>
          </div>

          <div className="flex justify-between items-center bg-red-100 p-4 rounded-lg">
            <span className="font-medium text-red-700">Incorrect Answers</span>
            <span className="font-bold text-red-800">{incorrectAnswers}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleGoHome}
            className="hover:bg-blue-50 mt-10 py-3 border border-blue-600 rounded-lg w-48 font-semibold text-blue-600 transition hover:cursor-pointer"
          >
            Go Home
          </button>

          <button
          onClick={() => navigate("/history")} 
          className="hover:bg-blue-50 mt-10 ml-4 py-3 border border-blue-600 rounded-lg w-48 font-semibold text-blue-600 transition hover:cursor-pointer">View History</button>
        </div>
      </div>
    </div>
  );
};

export default Resultpage;
