import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);

  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
  };

  React.useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
        );
        const data = await response.json();
        setQuestions(data.results);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchAPI();
  }, []);

  const questionElements = questions.map((question) => {
    return (
      <Question
        title={question.question}
        correctAnswer={question.correct_answer}
        incorrectAnswers={question.incorrect_answers}
        key={nanoid()}
      />
    );
  });

  return (
    <div className="container">
      {showOverlay && <Intro toggleOverlay={toggleOverlay} />}
      {questionElements}
      <div className="result">
        <p>You scored 3/5 correct answers</p>
        <button className="checkAnswer">Check answers</button>
      </div>
    </div>
  );
}

export default App;
