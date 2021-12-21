function Intro(props) {
  // save form data to state
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    props.setApiData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div className="intro">
      <h1 className="intro--title">Quizzical</h1>
      <p className="intro--text">
        Test Your Knowledge With These Trivia Questions
      </p>
      <label htmlFor="numOfQuestions" className="intro--label">
        Number of Questions:
      </label>
      <input
        className="intro--input"
        id="numOfQuestions"
        name="numOfQuestions"
        value={props.apiData.numOfQuestions}
        onChange={handleChange}
        type="number"
        placeholder="Number of Questions"
      />

      <label htmlFor="difficulty" className="intro--label">
        Select Difficulty:
      </label>
      <select
        className="intro--select"
        id="difficulty"
        name="difficulty"
        value={props.apiData.difficulty}
        onChange={handleChange}
      >
        <option value="anyDifficulty">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="intro--button" onClick={props.toggleOverlay}>
        Start quiz
      </button>
    </div>
  );
}

export default Intro;
