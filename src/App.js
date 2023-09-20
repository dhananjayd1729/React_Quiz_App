import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/header';
import './App.css';
import Footer from './components/Footer/footer.js';
import Home from './components/Pages/Home/home.js';
import Result from './components/Pages/Result/result.js';
import Quiz from './components/Pages/Quiz/quiz.js'; 
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
      category && `&category=${category}`}
      ${difficulty && `&difficulty=${difficulty}`}&type=multiple`);
    console.log(data);
    setQuestions(data.results);
  }
  return (
    <BrowserRouter>
    <div className='app'>
    <Header />
    
    <Routes>
      <Route exact path='/' element={<Home name = {name} setName={setName} fetchQuestions={fetchQuestions}/>} />
      <Route 
        exact 
        path='/quiz' 
        element={
          <Quiz 
            name = {name} 
            questions = {questions}
            score = {score}
            setQuestions = {setQuestions}
            setScore = {setScore}
           />} 
      />
      <Route exact path='/result' element={<Result name={name} score={score}/>} />
    </Routes>
    </div>
    <Footer />
    </BrowserRouter>
    
  );
}

export default App;
