import React, { useState, useEffect } from "react";
import './App.css';

function App() {
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('');
const [questionType, setQuestionType] = useState('');
const [questions, setQuestions] = useState([]);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [showScore, setShowScore] = useState(false);


useEffect(() => { // fetches the list of trivia categories from the API 
  fetch('https://opentdb.com/api_category.php')
    .then(response => response.json())
    .then(data => setCategories(data.trivia_categories));
}, []);

const fetchQuestions = () => {
  fetch(`https://opentdb.com/api.php?amount=5&category=${selectedCategory}&type=${questionType}`)
    .then(response => response.json())
    .then(data => setQuestions(data.results));
};

const handleCategoryChange = (e) => {
  setSelectedCategory(e.target.value);
};

const handleTypeChange = (e) => {
  setQuestionType(e.target.value);
};

const handleAnswerOptionClick = (isCorrect) => {
  if (isCorrect) {
    setScore(score + 1);
  }

  const nextQuestion = currentQuestion + 1;
  if (nextQuestion < questions.length) {
    setCurrentQuestion(nextQuestion);
  } else {
    setShowScore(true);
  }
};


return (
  <div className="App">
    {showScore ? (
      <div className="score-section">
        You scored {score} out of {questions.length}
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
            <button onClick={fetchQuestions} disabled={!selectedCategory || !questionType}>
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
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].incorrect_answers.concat(questions[currentQuestion].correct_answer)
                .sort(() => Math.random() - 0.5)
                .map((answerOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(answerOption === questions[currentQuestion].correct_answer)}
                  >
                    {answerOption}
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