import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import Result from "./components/Result";
import { nanoid } from "nanoid";

function App() {
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [showResult, setShowResult] = React.useState(false);
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
  }, []);

  const createAnswer = (answer, id, isHeld, isCorrect) => {
    return {
      answer,
      id,
      isHeld,
      isCorrect,
    };
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const sliceArray = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };

  const defineAnswers = () => {
    const allAnswers = [];
    questions.map((question) => {
      question.incorrect_answers.forEach((answer) => {
        allAnswers.push(createAnswer(answer, nanoid(), false, false));
      });
      allAnswers.push(
        createAnswer(question.correct_answer, nanoid(), false, true)
      );
      return allAnswers;
    });
    console.log(sliceArray(allAnswers, 4));
    setAnswers(sliceArray(allAnswers, 4));
  };

  const handleClick = (id) => {
    setAnswers((prevState) =>
      prevState.map((answer) => {
        return answer.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              isHeld: !elem.isHeld,
            };
          } else {
            return elem;
          }
        });
      })
    );
  };

  const checkResults = () => {
    setShowResult(true);
    answers.map((answer) => {
      return answer.forEach((item) => {
        if (item.isHeld && item.isCorrect) {
          setScore((prevScore) => prevScore + 1);
        }
      });
    });
  };

  const questionElements = answers.map((answer, i) => {
    return (
      <Question
        title={questions[i].question}
        key={nanoid()}
        answer={answer}
        handleClick={handleClick}
        score={score}
        showResult={showResult}
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
        showResult={showResult}
        questionAmount={questionAmount}
      />
    </div>
  );
}

export default App;
