import { decode } from "html-entities";
import React from "react";
import { nanoid } from "nanoid";

function Question(props) {
  const [answers, setAnswers] = React.useState([]);

  React.useEffect(() => {
    defineAnswers();
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
    props.incorrectAnswers.forEach((answer) => {
      allAnswers.push(createAnswer(answer, nanoid(), false));
    });
    allAnswers.push(createAnswer(props.correctAnswer, nanoid(), false));
    setAnswers(allAnswers);
  };

  const handleClick = (id) => {
    setAnswers((prevState) =>
      prevState.map((answer) => {
        if (answer.id === id) {
          return {
            ...answer,
            isHeld: !answer.isHeld,
          };
        } else {
          return answer;
        }
      })
    );
  };

  const checkResults = () => {
    // check if isHeld and correct answer
    // if so, turn answer green
    // else make it red
    // count correct answers
    // update ui

    answers.forEach((answer) => {
      if (answer.isHeld && answer.answer === props.correctAnswer) {
        props.setScore(prevState => prevState + 1)
        console.log('CORRECT')
      } else if (answer.isHeld && answer.answer !== props.correctAnswer) {
        console.log('WRONG')
      }
    });
  };

  setTimeout(() => {
    checkResults();
  }, 3000);

  const answerElements = answers.map((answer) => {
    return (
      <div
        key={answer.id}
        id={answer.id}
        className={`question--answer ${answer.isHeld ? "active" : ""}`}
        onClick={() => handleClick(answer.id)}
      >
        {decode(answer.answer)}
      </div>
    );
  });
  console.log("RENDER QUESTION")
  return (
    <div className="question">
      <div className="question--title">{decode(props.title)}</div>
      <div className="question-answers">{answerElements}</div>
    </div>
  );
}

export default Question;
