import { decode } from "html-entities";
import React from "react";

function Question(props) {
  // const [answers, setFourAnswers] = React.useState([]);

  // React.useEffect(() => {
    
  // }, []);

  const answerElements = props.answer.map((answer) => {
    return (
      <div
        key={answer.id}
        id={answer.id}
        className={`question--answer ${answer.isHeld ? "active" : ""}`}
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
