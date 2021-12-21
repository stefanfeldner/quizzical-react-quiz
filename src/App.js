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
  const [apiData, setApiData] = React.useState({
    numOfQuestions: 5,
    difficulty: "easy",
  });

  React.useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${apiData.numOfQuestions}&difficulty=${apiData.difficulty === 'anyDifficulty' ? '' : apiData.difficulty}&type=multiple`
        );
        const data = await response.json();
        setQuestions(data.results);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchAPI();
  }, [apiData]);

  // hideOverlay and define answers
  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
    defineAnswers();
  };
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  // slice all answers in chunks of four
  const sliceArray = (arr, chunkSize) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      shuffleArray(chunk);
      res.push(chunk);
    }
    return res;
  };

  const createAnswer = (answer, id, isHeld, isCorrect) => {
    return {
      answer,
      id,
      isHeld,
      isCorrect,
    };
  };

  // define all answers from the api data
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
    setAnswers(sliceArray(allAnswers, 4));
  };

  // change status on click to active
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

  // check if correct answer is clicked and color mark it
  const checkResults = () => {
    if (showResult === false) {
      setShowResult(true);
      answers.map((answer) => {
        return answer.forEach((item) => {
          if (item.isHeld && item.isCorrect) {
            setScore((prevScore) => prevScore + 1);
          }
        });
      });
    } else {
      window.location.reload(false);
    }
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
      {showOverlay && (
        <Intro
          setApiData={setApiData}
          apiData={apiData}
          toggleOverlay={toggleOverlay}
        />
      )}
      {questionElements}
      <Result
        checkResults={checkResults}
        score={score}
        showResult={showResult}
        apiData={apiData}
      />
    </div>
  );
}

export default App;
