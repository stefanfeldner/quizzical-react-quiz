import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";

function App() {
  const [showOverlay, setShowOverlay] = React.useState(true);

  const toggleOverlay = () => {
    setShowOverlay((prevState) => !prevState);
  };

  return (
    <div className="container">
      {showOverlay && <Intro toggleOverlay={toggleOverlay} />}
      <Question />
      <Question />
      <div className="result">
        <p>You scored 3/5 correct answers</p>
        <button className="checkAnswer">Check answers</button>
      </div>
    </div>
  );
}

export default App;
