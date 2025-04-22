import React, { useState } from "react";
import "./App.css";
import quizData from "./data/quizData";

function App() {
  const [selectedCartoon, setSelectedCartoon] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleCartoonSelect = (e) => {
    const cartoon = e.target.value;
    setSelectedCartoon(cartoon);
    const quiz = quizData[cartoon];
    if (quiz) {
      setQuestions(quiz.slice(0, 5));
      setCurrentIndex(0);
      setScore(0);
      setFeedback("");
      setShowResult(false);
    }
  };

  const handleAnswer = (answer) => {
    const correct = questions[currentIndex].correct;
    if (answer === correct) {
      setScore(score + 1);
      setFeedback("✅ إجابة صحيحة!");
    } else {
      setFeedback(`❌ إجابة خاطئة! الإجابة الصحيحة: ${correct}`);
    }

    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        setFeedback("");
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <div className="App">
      <h1>اختبار كرتون الطفولة 🎉</h1>

      {!selectedCartoon && (
        <select defaultValue="" onChange={handleCartoonSelect}>
          <option value="" disabled>
            اختر كرتون...
          </option>
          {Object.keys(quizData).map((cartoon) => (
            <option key={cartoon} value={cartoon}>
              {cartoon}
            </option>
          ))}
        </select>
      )}

      {selectedCartoon && !showResult && (
        <div className="quiz-box">
          <h2>{questions[currentIndex].question}</h2>
          <div className="answers">
            {questions[currentIndex].answers.map((answer, i) => (
              <button key={i} onClick={() => handleAnswer(answer)}>
                {answer}
              </button>
            ))}
          </div>
          <p className="feedback">{feedback}</p>
        </div>
      )}

      {showResult && (
        <div className="result">
          <h2>🎉 لقد أنهيت الاختبار!</h2>
          <p>
            نتيجتك: {score} من {questions.length}
          </p>
          <button onClick={() => setSelectedCartoon("")}>إعادة الاختبار</button>
        </div>
      )}
    </div>
  );
}

export default App;
