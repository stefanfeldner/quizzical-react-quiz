import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import Result from "./components/Result";
import { nanoid } from "nanoid";

function App() {
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const questionAmount = 5;

  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
    defineAnswers();
  };

  React.useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${questionAmount}&difficulty=easy&type=multiple`
        );
        const data = await response.json();
        setQuestions(data.results);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createAnswer = (answer, id, isHeld) => {
    return {
      answer,
      id,
      isHeld,
    };
  };

  const defineAnswers = () => {
    const allAnswers = [];
    questions.map((question) => {
      question.incorrect_answers.forEach((answer) => {
        allAnswers.push(createAnswer(answer, nanoid(), false));
      });
      allAnswers.push(createAnswer(question.correct_answer, nanoid(), false));
      // console.log(allAnswers);
      return allAnswers;
    });
    setAnswers(sliceArray(allAnswers, 4));
  };

  console.log(answers);
  function sliceArray(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const handleClick = (id) => {
    setAnswers((prevState) =>
      prevState.map((answer) => {
        return answer.map(elem => {
          if (elem.id === id) {
            return {
              ...elem,
              isHeld: !elem.isHeld,
            };
          } else {
            return elem;
          }
        })
      })
    );
  };

  const checkResults = () => {
    // check if isHeld and correct answer
    // if so, turn answer green
    // else make it red
    // count correct answers
    // update ui
    console.log('clicked')
    // questions.map((question) => {
    //   answers.forEach((answer) => {
    //     if (answer.isHeld && answer.answer === question.correctAnswer) {
    //       setScore((prevState) => prevState + 1);
    //       console.log("CORRECT");
    //     } else if (answer.isHeld && answer.answer !== question.correctAnswer) {
    //       console.log("WRONG");
    //     }
    //   });
    // });
  };

  const questionElements = answers.map((answer, i) => {
    return (
      <Question 
        title={questions[i].question} 
        key={nanoid()} 
        answer={answer} 
        handleClick={handleClick}
      />
    );
  });

  return (
    <div className="container">
      {showOverlay && <Intro toggleOverlay={toggleOverlay} />}
      {questionElements}
      <Result
        checkResults={checkResults}
        score={score}
        questionAmount={questionAmount}
      />
    </div>
  );
}

export default App;
