import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import questionsData from '../data/questions'; // adjust if your file is elsewhere

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartoon = location.state?.cartoon || 'ريمي'; // default to ريمي
  const questions = questionsData[cartoon];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selected, setSelected] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    const correct = option === questions[current].answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    setCurrent(prev => prev + 1);
    setShowFeedback(false);
    setSelected('');
  };

  useEffect(() => {
    if (current >= questions.length) {
      navigate('/result', { state: { score, total: questions.length } });
    }
  }, [current, score, navigate, questions.length]);

  if (current >= questions.length) return null;

  return (
    <div className="p-6 max-w-md mx-auto text-center">

    <h1 className="text-2xl font-bold mb-6 text-blue-700">الشارة الكرتونية</h1>      
    <h2 className="text-xl font-bold mb-4">سؤال {current + 1} من {questions.length}</h2>
      <p className="text-lg mb-6">{questions[current].question}</p>
      <div className="grid gap-3">
        {questions[current].options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            disabled={showFeedback}
            className={`py-2 px-4 rounded-xl border 
              ${selected === opt && showFeedback
                ? opt === questions[current].answer
                  ? 'bg-green-400 text-white'
                  : 'bg-red-400 text-white'
                : 'hover:bg-gray-100'}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-4">
          <p className={`text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? 'إجابة صحيحة!' : 'إجابة خاطئة!'}
          </p>
          <button
            onClick={nextQuestion}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-xl hover:bg-blue-600"
          >
            التالي
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
