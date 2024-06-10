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




}

export default App;