import { useQuizStore } from '../store/useQuizStore';

export default function QuizStart() {
  const { startQuiz, questions } = useQuizStore();

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
      <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4">
        🧠
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Web Knowledge Quiz</h1>
      <p className="text-slate-500 mb-6 text-sm">
        Uji pengetahuan Anda seputar React, JavaScript, dan Web Development.
      </p>

      <div className="bg-slate-50 rounded-xl p-4 text-left mb-6 space-y-2 text-sm text-slate-600">
        <p>📋 <strong>Total Soal:</strong> {questions.length} Pertanyaan</p>
        <p>⏱️ <strong>Waktu per Soal:</strong> 60 Detik</p>
        <p>⚠️ <strong>Aturan Skoring:</strong> Benar = +1, Waktu Habis = -1</p>
      </div>

      <button
        onClick={startQuiz}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-200"
      >
        Mulai Kuis
      </button>
    </div>
  );
}