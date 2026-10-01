import { create } from 'zustand';
import type { Question, QuizStatus, UserAnswer } from '../types/quiz';

interface QuizStore {
  status: QuizStatus;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  timeLeft: number;
  userAnswers: UserAnswer[];
  selectedOption: string | null;

  setQuestions: (questions: Question[]) => void;
  startQuiz: () => void;
  selectAnswer: (answer: string) => void;
  handleTimeout: () => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  tickTimer: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  status: 'IDLE',
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  timeLeft: 60,
  userAnswers: [],
  selectedOption: null,

  setQuestions: (questions) => set({ questions }),

  startQuiz: () => set({
    status: 'PLAYING',
    currentQuestionIndex: 0,
    score: 0,
    timeLeft: 60,
    userAnswers: [],
    selectedOption: null,
  }),

  tickTimer: () => set((state) => ({ timeLeft: state.timeLeft - 1 })),

  selectAnswer: (selectedAnswer) => {
    const { questions, currentQuestionIndex, userAnswers, score, selectedOption } = get();
    if (selectedOption !== null) return; // Mencegah klik ganda

    const currentQ = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    set({
      selectedOption: selectedAnswer,
      score: isCorrect ? score + 1 : score,
      userAnswers: [
        ...userAnswers,
        {
          questionId: currentQ.id,
          selectedAnswer,
          correctAnswer: currentQ.correctAnswer,
          isCorrect,
        },
      ],
    });
  },

  handleTimeout: () => {
    const { questions, currentQuestionIndex, userAnswers, score } = get();
    const currentQ = questions[currentQuestionIndex];

    set({
      selectedOption: 'TIMEOUT',
      score: score - 1, // Penalti -1 poin jika waktu habis
      userAnswers: [
        ...userAnswers,
        {
          questionId: currentQ.id,
          selectedAnswer: null,
          correctAnswer: currentQ.correctAnswer,
          isCorrect: false,
        },
      ],
    });
  },

  nextQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    if (currentQuestionIndex + 1 < questions.length) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        timeLeft: 60,
        selectedOption: null,
      });
    } else {
      set({ status: 'FINISHED' });
    }
  },

  resetQuiz: () => set({
    status: 'IDLE',
    currentQuestionIndex: 0,
    score: 0,
    timeLeft: 60,
    userAnswers: [],
    selectedOption: null,
  }),
}));