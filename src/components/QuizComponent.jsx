import { useState, useEffect } from 'react';
import FillInTheBlankComponent from './FillInTheBlankComponent';
import UnderlineComponent from './UnderlineComponent';
import './QuizComponent.css';

const QuizComponent = () => {
  const [currentQuestionType, setCurrentQuestionType] = useState('fill');
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const questionTypes = ['fill', 'underline'];
  const phrases = [
    "Konnichiwa", 
    "Arigatou gozaimasu",
    "Sumimasen",
    "Ohayou gozaimasu",
    "Sayounara"
  ];

  const generateQuestion = () => {
    const nextType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    setCurrentQuestionType(nextType);
    setFeedback('');
    setIsCorrect(null);
  };

  const handleAnswer = (correct) => {
    setIsCorrect(correct);
    setFeedback(correct ? 'Correct! 🎉' : 'Try again!');
    
    if (correct) {
      setScore(score + 10);
    }
    
    setQuestionsAnswered(questionsAnswered + 1);
  };

  const handleNext = () => {
    generateQuestion();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="quiz-container">
      <div className="score-display">Score: {score}</div>
      <div className="question-counter">Questions: {questionsAnswered}</div>

      {currentQuestionType === 'fill' ? (
        <FillInTheBlankComponent 
          onAnswer={handleAnswer}
          showFeedback={false}
        />
      ) : (
        <div className="underline-question">
          <p>Translate the underlined word:</p>
          <UnderlineComponent />
          <input
            type="text"
            className="answer-input"
            placeholder="Your answer"
          />
          <button 
            className="check-button"
            onClick={() => handleAnswer(Math.random() > 0.5)} // Temporary random answer
          >
            Check
          </button>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {feedback}
          <button onClick={handleNext} className="next-button">
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
