import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import Result from "./components/Result";
import { nanoid } from "nanoid";

function App() {
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const questionAmount = 5;

  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
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

  const checkResults = () => {
    console.log("Checking");
  };

  const questionElements = questions.map((question) => {
    return (
      <Question
        title={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
        key={nanoid()}
        setScore={setScore}
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
