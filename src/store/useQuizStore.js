import { create } from "zustand";

const useQuizStore = create((set) => ({
  // Initial state
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,
  userAnswers: [],

  //Actions to update the state
  setQuestions: (questions) =>
    set({
      questions: Array.isArray(questions) ? questions : [],
      userAnswers: Array.isArray(questions)
        ? Array(questions.length).fill(null)
        : [],
      currentQuestionIndex: 0,
    }),

  selectAnswer: (answer) =>
    set((state) => {
      const updatedAnswers = [...state.userAnswers];
      updatedAnswers[state.currentQuestionIndex] = answer;
      return { userAnswers: updatedAnswers };
    }),

  incrementScore: () =>
    set((state) => ({
      score: state.score + 1,
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  prevQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex - 1,
    })),

  resetQuiz: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: [],
    }),
}));

export default useQuizStore;
