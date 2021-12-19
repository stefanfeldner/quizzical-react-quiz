import { decode } from "html-entities";
import React from "react";

function Question(props) {
  const answerElements = props.answer.map((answer) => {
    let status = ''
    if (props.score > 0 || props.showResult) {
      if (answer.isHeld && answer.isCorrect) {
        status = 'correct';
      } else if (answer.isHeld && !answer.isCorrect) {
        status = 'wrong'
      } else if (answer.isCorrect) {
        status = 'correct'
      } else if (answer.isHeld) {
        status = 'active'
      } else {
        status = ''
      }
    } else {
      if (answer.isHeld) status = 'active'
    }
    return (
      <div
        key={answer.id}
        id={answer.id}
        className={`question--answer ${status}`}
        onClick={() => props.handleClick(answer.id)}
      >
        {decode(answer.answer)}
      </div>
    );
  });

  return (
    <div className="question">
      <div className="question--title">{decode(props.title)}</div>
      <div className="question-answers">{answerElements}</div>
    </div>
  );
}

export default Question;
