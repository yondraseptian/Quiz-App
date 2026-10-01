export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

export interface UserAnswer {
    questionId: number;
    selectedAnswer: string;
    CorrectAnswer: string;
    isCorrect: boolean;
}

export type QuizStatus = 'IDLE' | 'PLAYING' | 'FINISHED';