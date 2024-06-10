import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => setCategories(data.trivia_categories));
  }, []);

  const fetchQuestions = () => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${selectedCategory}&type=${questionType}&difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => setQuestions(data.results));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleAnswerOptionClick = (answer, isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([
      ...userAnswers,
      { question: questions[currentQuestion].question, answer, correct: questions[currentQuestion].correct_answer }
    ]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <div className="App">
      {showScore ? (
        <div className="score-section">
          <h2>You scored {score} out of {questions.length}</h2>
          <h3>Review Your Answers:</h3>
          <ul>
            {userAnswers.map((answer, index) => (
              <li key={index}>
                <p><strong>Question:</strong> {decodeHTMLEntities(answer.question)}</p>
                <p><strong>Your Answer:</strong> {decodeHTMLEntities(answer.answer)}</p>
                <p><strong>Correct Answer:</strong> {decodeHTMLEntities(answer.correct)}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <h1>Quiz App</h1>
          {questions.length === 0 ? (
            <>
              <div>
                <label>Select Category: </label>
                <select value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Select Type: </label>
                <select value={questionType} onChange={handleTypeChange}>
                  <option value="">Select</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>
              <div>
                <label>Select Difficulty: </label>
                <select value={difficulty} onChange={handleDifficultyChange}>
                  <option value="">Select</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button onClick={fetchQuestions} disabled={!selectedCategory || !questionType || !difficulty}>
                Start Quiz
              </button>
            </>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {decodeHTMLEntities(questions[currentQuestion].question)}
                </div>
              </div>
              <div className="answer-section">
                {questions[currentQuestion].incorrect_answers.concat(questions[currentQuestion].correct_answer)
                  .sort(() => Math.random() - 0.5)
                  .map((answerOption, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerOptionClick(answerOption, answerOption === questions[currentQuestion].correct_answer)}
                    >
                      {decodeHTMLEntities(answerOption)}
                    </button>
                  ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
