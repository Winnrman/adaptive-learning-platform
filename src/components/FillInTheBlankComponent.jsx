import { useState, useEffect } from 'react';
import './FillInTheBlankComponent.css';

// Default data in case JSON files are missing or malformed
const defaultHiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'];
const defaultRomanji = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko'];

const loadData = () => {
  try {
    const hiraganaData = require('../hiragana.json');
    const romanjiData = require('../romanji.json');
    return {
      hiragana: Array.isArray(hiraganaData) ? hiraganaData : defaultHiragana,
      romanji: Array.isArray(romanjiData) ? romanjiData : defaultRomanji
    };
  } catch (error) {
    console.error('Error loading data files, using default data:', error);
    return {
      hiragana: defaultHiragana,
      romanji: defaultRomanji
    };
  }
};

const FillInTheBlankComponent = ({ onAnswer, showFeedback = true }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const [data, setData] = useState({ hiragana: [], romanji: [] });

  useEffect(() => {
    setData(loadData());
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    // if (data.hiragana.length === 0 || data.romanji.length === 0) {
    //   console.warn('No data available to generate question');
    //   return;
    // }

    const randomIndex = Math.floor(Math.random() * data.hiragana.length);
    const hiragana = data.hiragana[randomIndex];
    const romanji = data.romanji[randomIndex];

    setCurrentQuestion({
      hiragana,
      romanji,
      blankPosition: Math.floor(Math.random() * romanji.length)
    });
    setUserAnswer('');
    setFeedback('');
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    const expectedChar = currentQuestion.romanji[currentQuestion.blankPosition];
    const isAnswerCorrect = userAnswer.toLowerCase() === expectedChar.toLowerCase();

    if (onAnswer) {
      onAnswer(isAnswerCorrect);
    } else {
      setIsCorrect(isAnswerCorrect);
      setFeedback(isAnswerCorrect ? 'Correct! 🎉' : `Try again! The answer was ${expectedChar}`);
    }

    if (isAnswerCorrect) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    generateQuestion();
  };

  const displayQuestion = () => {
    if (!currentQuestion) return null;

    const { romanji, blankPosition } = currentQuestion;
    const displayText = romanji.split('').map((char, index) =>
      index === blankPosition ? '_' : char
    ).join(' ');

    return (
      <div className="question-display">
        <div className="hiragana-display">{currentQuestion.hiragana}</div>
        <div className="romanji-blank">{displayText}</div>
      </div>
    );
  };

  const displayRomanjiInput = () => {
    if (!currentQuestion) return null;

    const { romanji, blankPosition } = currentQuestion;
    const beforeBlank = romanji.slice(0, blankPosition);
    const afterBlank = romanji.slice(blankPosition + 1);

    return (
      <div className="answer-section">
        <div className="romanji-display">
          {beforeBlank}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            maxLength="1"
            placeholder="?"
            className="answer-input"
          />
          {afterBlank}
        </div>
        <button onClick={checkAnswer} className="check-button">
          Check
        </button>
      </div>
    );
  };

  return (
    <div className="fill-in-the-blank-container">
      <div className="score-display">Score: {score}</div>

      {displayQuestion()}

      {displayRomanjiInput()}

      {showFeedback && feedback && (
        <>
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {feedback}
          </div>
          <button onClick={handleNext} className="next-button">
            Next Question
          </button>
        </>
      )}
    </div>
  );
};

export default FillInTheBlankComponent;
