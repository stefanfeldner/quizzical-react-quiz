import React from "react";

function Result(props) {
  return (
    <div className="result">
      {props.showResult && <p>You scored {props.score}/{props.apiData.numOfQuestions} correct answers</p>}
      <button className="checkAnswer" onClick={props.checkResults}>{props.showResult ? 'Reset game' : 'Check answers'}</button>
    </div>
  );
}

export default Result;
