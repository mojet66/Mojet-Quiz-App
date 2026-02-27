import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/useQuizStore";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        setCategories(data.trivia_categories);
        // eslint-disable-next-line no-unused-vars
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
      <h1 className="mb-10 md:mb-15 lg:mb-20 font-bold text-white text-2xl md:text-4xl lg:text-5xl text-center">
        WELCOME TO MOJET QUIZ CHALLENGE
      </h1>
      <p className="mb-10 text-white text-sm md:text-base lg:text-lg text-center">
        <em>
          ...test your knowledge✍️📚, push your limits💪🚀, and see how you
          stack up. Choose a category, set your difficulty, and let’s get
          started
        </em>
      </p>
      <p className="mb-10 text-white text-sm md:text-base lg:text-lg text-center">
        Think you've got what it takes🤔🤔? Lets put it to a test.
      </p>

      <div className="flex md:flex-row lg:flex-row flex-col justify-center gap-4 mt-4">
        {/* CATEGORY */}

        <div>
          <label className="block font-medium text-gray-700 text-sm md:text-base lg:text-lg">
            Quiz Topic
          </label>
          <select
            className="p-1 border border-gray-500 rounded-md w-36 cursor-pointer"
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
          <label className="block font-medium text-gray-700 text-sm md:text-base lg:text-lg">
            Quiz Difficulty
          </label>
          <select
            className="p-1 border border-gray-500 rounded-md w-36 cursor-pointer"
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
          <label className="block font-medium text-gray-700 text-sm md:text-base lg:text-lg">
            Number of Questions
          </label>
          <select
            className="p-1 border border-gray-500 rounded-md w-36 cursor-pointer"
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
