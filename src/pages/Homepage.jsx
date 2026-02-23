import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/useQuizStore";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const navigate = useNavigate();
  const { setQuestions, resetQuiz } = useQuizStore();

  const handleStartQuiz = async () => {
    setLoading(true);
    setError("");
    resetQuiz();

    if (!selectedCategory || !selectedDifficulty || !questionCount) {
      setError("Please select all options before starting the quiz.");
      setLoading(false);
      return;
    }

    const url = `https://opentdb.com/api.php?amount=${questionCount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
        navigate("/quiz");
      } else {
        setError(
          "No quiz data found for the selected options. Please try different settings.",
        );
      }
    } catch (error) {
      setError("Failed to fetch quiz data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-20 font-bold text-white text-3xl">
        WELCOME TO MOJET QUIZ APP
      </h1>
      <p className="mb-10 text-white">
        <em>
          ...study📚✍️ to show yourself approved unto God, a workman who needs
          not to be ashamed, rightly dividing the word of truth (2 Timo 2 v 15)
        </em>
      </p>
      <p className="mb-10 text-white">
        How well do you know the scriptures?🤔🤔 Shall we put it to the test?
      </p>

      <div className="flex justify-center gap-4 mt-4">
        {/* CATEGORY */}

        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Quiz Topic
          </label>
          <select
            className="p-1 border border-gray-500 rounded-md w-36"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a topic</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* DIFFICULTY */}

        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Quiz Difficulty
          </label>
          <select
            className="p-1 border border-gray-500 rounded-md w-36"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* QUESTION COUNT */}

        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Number of Questions
          </label>
          <select
            className="p-1 border border-gray-500 rounded-md w-36"
            value={questionCount}
            onChange={(e) => setQuestionCount(e.target.value)}
          >
            <option value="">Select Number</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>

      {/* Start Button  */}
      <button
        type="button"
        id="button"
        onClick={handleStartQuiz}
        disabled={loading}
        className="mt-10 glow-on-hover"
      >
        <i>{loading ? "Loading..." : "Click to begin😁"}</i>
      </button>
    </div>
  );
};

export default Homepage;
