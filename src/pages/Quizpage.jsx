import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/useQuizStore";

const Quizpage = () => {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    selectAnswer,
    nextQuestion,
    prevQuestion,
  } = useQuizStore();

  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  // if (!currentQuestion) return <p>Loading...</p>;

  if (questions.length === 0) {
    return <p>No quiz data found. Pls start a quiz</p>;
  }

  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      nextQuestion();
    } else {
      navigate("/results");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 px-4 min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-2xl">
        {/* Title */}
        <div className="flex justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Category: {currentQuestion.category}
          </p>
          <p className="text-gray-500 text-sm">
            Difficulty: {currentQuestion.difficulty}
          </p>
        </div>
        {/* Question Progress */}
        <p className="mb-4 text-gray-500 text-sm">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>

        {/* Question Text */}
        <h2 className="mb-6 font-semibold text-gray-800 text-2xl">
          {currentQuestion.question}
        </h2>

        {/* Answer Options */}
        <div className="space-y-4">
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => selectAnswer(answer)}
              className={`w-full text-left p-4 rounded-lg border ${
                userAnswers[currentQuestionIndex] === answer
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-300 hover:bg-gray-100"
              } transition`}
            >
              {answer}
            </button>
          ))}
        </div>

        {/* Navigation Button */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-300 disabled:opacity-50 px-4 py-2 rounded"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!userAnswers[currentQuestionIndex]}
            className="bg-blue-600 disabled:opacity-50 px-6 py-2 rounded text-white"
          >
            {currentQuestionIndex + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quizpage;
