import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../Question/question.js";
import "./quiz.css"

const Quiz = ({name, score, questions, setQuestions, setScore}) => {
  
  const[options, setOptions] = useState();
  const[currQues, setCurrQues] = useState(0);

  useEffect(()=> {
    setOptions(questions && handleShuffle(
      [
        questions[currQues]?.correct_answer,
        ...questions[currQues]?.incorrect_answers,
      ]
    ));
  }, [questions, currQues]);

  const handleShuffle = (optionss) => {
     return optionss.sort(() => Math.random() - 0.5);
  }
  
  return (
        <div className="quiz">
          <span className="subtitle"> Welcome, {name}</span> 
          
          {questions ? (<>
            <div className="quizInfo">
               {/* <span> {questions[currQues].category}</span> */}
               <span> Score : {score}</span>
            </div>
            <Question 
              currQues={currQues}
              setCurrQues={setCurrQues}
              questions={questions}
              options={options}
              correct={questions[currQues]?.correct_answer}
              score={score}
              setScore={setScore}
            />
          </>) : (
          <CircularProgress 
            style={{margin:100}}
            color = "inherit"
            size = {150}
            thickness={1}
            />)}
        </div>
    )
}
export default Quiz;