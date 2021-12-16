function Intro(props) {
  return (
    <div className="intro">
      <h1 className="intro--title">Quizzical</h1>
      <p className="intro--text">
        Test Your Knowledge With These Trivia Questions
      </p>
      <button className="intro--button" onClick={props.toggleOverlay}>
        Start quiz
      </button>
    </div>
  );
}

export default Intro;
