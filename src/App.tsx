import { useEffect } from "react";
import "./App.css";
import QuizCard from "./components/QuizCard";
import QuizResult from "./components/QuizResult";
import QuizStart from "./components/QuizStart";
import { useQuizStore } from "./store/useQuizStore";

function App() {
  const { status, setQuestions } = useQuizStore();

  useEffect(() => {
    fetch("quiz-data.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [setQuestions]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      {status === "IDLE" && <QuizStart />}
      {status === "PLAYING" && <QuizCard />}
      {status === "FINISHED" && <QuizResult />}
    </main>
  );
}

export default App;
