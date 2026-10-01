import { useEffect } from 'react';
import { useQuizStore } from '../store/useQuizStore';

export default function QuizCard() {
  const {
    questions,
    currentQuestionIndex,
    timeLeft,
    tickTimer,
    selectAnswer,
    handleTimeout,
    selectedOption,
    nextQuestion,
  } = useQuizStore();

  const currentQuestion = questions[currentQuestionIndex];

  // Logika Timer 60 Detik
  useEffect(() => {
    if (selectedOption !== null) return; // Hentikan timer jika sudah dijawab

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => tickTimer(), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, selectedOption, tickTimer, handleTimeout]);

  // Styling Tombol Jawaban (Merah / Hijau)
  const getButtonClass = (option: string) => {
    if (selectedOption === null) {
      return 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-indigo-300';
    }

    const isCorrect = option === currentQuestion.correctAnswer;
    const isSelected = option === selectedOption;

    if (isCorrect) {
      return 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-100';
    }
    if (isSelected && !isCorrect) {
      return 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-100';
    }
    return 'bg-slate-50 text-slate-400 border-slate-100 opacity-50';
  };

  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100">
      {/* Header Info & Timer */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
          Soal {currentQuestionIndex + 1} dari {questions.length}
        </span>
        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
          timeLeft <= 10 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-600'
        }`}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      {/* Progress Bar Timer */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-indigo-600 h-full transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>

      {/* Teks Pertanyaan */}
      <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 leading-snug">
        {currentQuestion.question}
      </h2>

      {/* Pilihan Jawaban */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            disabled={selectedOption !== null}
            onClick={() => selectAnswer(option)}
            className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all duration-200 flex justify-between items-center ${getButtonClass(option)}`}
          >
            <span>{option}</span>
            {selectedOption !== null && option === currentQuestion.correctAnswer && (
              <span>✓</span>
            )}
            {selectedOption === option && option !== currentQuestion.correctAnswer && (
              <span>✕</span>
            )}
          </button>
        ))}
      </div>

      {/* Tombol Next (Muncul setelah memilih jawaban / waktu habis) */}
      {selectedOption !== null && (
        <button
          onClick={nextQuestion}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
        >
          {currentQuestionIndex + 1 === questions.length ? 'Lihat Hasil' : 'Soal Berikutnya →'}
        </button>
      )}
    </div>
  );
}