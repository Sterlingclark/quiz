import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [loading, setLoading] = useState(false);
  const [animation, setAnimation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalTestsTaken, setTotalTestsTaken] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => setCategories(data.trivia_categories));
  }, []);

  const fetchQuestions = () => {
    setLoading(true);
    fetch(`https://opentdb.com/api.php?amount=5&category=${selectedCategory}&type=${questionType}&difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results);
        setLoading(false);
      });
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
      setTotalTestsTaken(totalTestsTaken + 1);
      setTotalScore(totalScore + score + 1);

      if (score + 1 === questions.length) {
        setAnimation('fireworks');
      } else if (score + 1 < questions.length / 2) {
        setAnimation('frownies');
      }
    }
  };

  const handleViewTotalClick = () => {
    setShowModal(true);
  };

  const restartQuiz = () => {
    setSelectedCategory('');
    setQuestionType('');
    setDifficulty('');
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setUserAnswers([]);
    setAnimation('');
  };

  function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <div className="App container">
      <header className="my-4">
        <h1>Quiz App</h1>
        <button onClick={handleViewTotalClick} className="btn btn-info mr-2">View Total Score</button>
        {showScore && (
          <button onClick={restartQuiz} className="btn btn-secondary">Restart Quiz</button>
        )}
      </header>

      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <h2>You scored {score} out of {questions.length}</h2>
          <h3>Review Your Answers:</h3>
          <ul className="list-group">
            {userAnswers.map((answer, index) => (
              <li key={index} className="list-group-item">
                <p><strong>Question:</strong> {decodeHTMLEntities(answer.question)}</p>
                <p><strong>Your Answer:</strong> {decodeHTMLEntities(answer.answer)}</p>
                <p><strong>Correct Answer:</strong> {decodeHTMLEntities(answer.correct)}</p>
              </li>
            ))}
          </ul>
          {animation === 'fireworks' && (
            <div className="animation-container">
              <video className="animation" autoPlay loop muted>
                <source src="/fireworks.mp4" type="video/mp4" />
              </video>
            </div>
          )}
          {animation === 'frownies' && (
            <div className="animation-container">
              <video className="animation" autoPlay loop muted>
                <source src="/frowny-face.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      ) : (
        <>
          {questions.length === 0 ? (
            <div className="mb-4">
              <div className="form-group">
                <label>Select Category: </label>
                <select value={selectedCategory} onChange={handleCategoryChange} className="form-control">
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Select Type: </label>
                <select value={questionType} onChange={handleTypeChange} className="form-control">
                  <option value="">Select</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>
              <div className="form-group">
                <label>Select Difficulty: </label>
                <select value={difficulty} onChange={handleDifficultyChange} className="form-control">
                  <option value="">Select</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button onClick={fetchQuestions} disabled={!selectedCategory || !questionType || !difficulty} className="btn btn-primary">
                Start Quiz
              </button>
            </div>
          ) : (
            <div className="card my-4">
              <div className="card-body">
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
                        className="btn btn-outline-primary btn-block my-2"
                      >
                        {decodeHTMLEntities(answerOption)}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <footer className="mt-4">
        <p>&copy; 2024 Quiz App. All rights reserved.</p>
      </footer>

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Your Total Score</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Total Tests Taken: {totalTestsTaken}</p>
              <p>Total Score: {totalScore}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
