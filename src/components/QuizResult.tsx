import { useQuizStore } from '../store/useQuizStore';

export default function QuizResult() {
  const { score, questions, userAnswers, resetQuiz } = useQuizStore();

  return (
    <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 my-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Hasil Kuis Selesai!</h1>
        <p className="text-slate-500 text-sm">Berikut adalah rekapitulasi nilai Anda</p>

        <div className="inline-block mt-4 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1">Skor Akhir</span>
          <span className="text-4xl font-extrabold text-indigo-600">{score}</span>
          <span className="text-slate-400 text-sm"> / {questions.length}</span>
        </div>
      </div>

      {/* Rekap Jawaban */}
      <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Detail Jawaban:</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
        {userAnswers.map((answer, index) => {
          const q = questions.find((item) => item.id === answer.questionId);
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border text-sm ${
                answer.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
              }`}
            >
              <p className="font-semibold text-slate-800 mb-1">
                {index + 1}. {q?.question}
              </p>
              <p className="text-slate-600">
                Jawaban Anda:{' '}
                <span className={`font-semibold ${answer.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {answer.selectedAnswer || '⚠️ Waktu Habis'}
                </span>
              </p>
              {!answer.isCorrect && (
                <p className="text-slate-600">
                  Jawaban Benar: <span className="font-semibold text-emerald-600">{answer.correctAnswer}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={resetQuiz}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-200"
      >
        Ulangi Kuis 🔄
      </button>
    </div>
  );
}