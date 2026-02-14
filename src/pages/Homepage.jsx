import { useEffect, useState } from "react";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleStartQuiz = () => {
    const url = `https://opentdb.com/api.php?amount=${questionCount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
    console.log("Quiz URL:", url);
    // You can navigate to the quiz page or fetch questions here
  };

  // if (loading) {
  //   return <p className="text-white">Loading categories...</p>;
  // }
  if (error) {
    return <p className="text-white">{error}</p>;
  }

  return (
    <div>
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
        disabled={!selectedCategory || !selectedDifficulty || !questionCount}
        className="mt-10 glow-on-hover"
      >
        <i>Click to begin😁</i>
      </button>
    </div>
  );
};

export default Homepage;
