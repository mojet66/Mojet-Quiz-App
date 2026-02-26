import useQuizStore from "../store/useQuizStore";
import { useNavigate } from "react-router-dom";

const Historypage = () => {
  const { quizHistory } = useQuizStore();
  const navigate = useNavigate();
  return (
    <div className="bg-slate-900 p-6 min-h-screen">
      <h1 className="mb-8 font-bold text-white text-3xl text-center">
        Quiz History
      </h1>

      {quizHistory.length === 0 ? (
        <p className="text-white text-center">No quizzes taken yet.</p>
      ) : (
        <div className="space-y-4">
          {quizHistory.map((quiz) => (
            <div key={quiz.id} className="bg-white shadow-lg p-6 rounded-xl">
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold text-lg">{quiz.category}</h2>
                <span className="text-slate-500 text-sm capitalize">
                  {quiz.difficulty}
                </span>
              </div>
              <p>
                Score: {quiz.correctAnswers} / {quiz.totalQuestions}
              </p>

              <p className="font-bold text-blue-600">{quiz.percentage}%</p>

              <p className="text-slate-400 text-xs">
                {new Date(quiz.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          navigate("/");
        }}
        className="hover:bg-blue-50 mt-10 py-3 border border-red-600 rounded-lg w-48 font-semibold text-red-600 transition hover:cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
};

export default Historypage;
