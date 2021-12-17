import React from "react";

function Result(props) {
  return (
    <div className="result">
      {props.score > 0 && <p>You scored {props.score}/{props.questionAmount} correct answers</p>}
      <button className="checkAnswer" onClick={props.checkResults}>Check answers</button>
    </div>
  );
}

export default Result;