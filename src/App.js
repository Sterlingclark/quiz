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


}

export default App;