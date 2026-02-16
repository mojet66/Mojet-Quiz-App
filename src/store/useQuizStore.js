import { create } from "zustand";

const useQuizStore = create((set) => ({
  // Initial state
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,

  //Actions to update the state
  setQuestions: (questions) => set({ questions }),
  selectAnswer: (answer) => set({ selectedAnswer: answer }),
  incrementScore: () =>
    set((state) => ({
      score: state.score + 1,
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      selectedAnswer: null,
    })),
  resetQuiz: () =>
    set({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
    }),
}));

export default useQuizStore;
