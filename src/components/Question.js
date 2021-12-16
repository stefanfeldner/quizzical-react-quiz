function Question(props) {
  return (
    <div className="question">
      <div className="question--title">
        Which best selling toy of 1983 caused hysteria, resulting in riots
        breaking in stores?
      </div>
      <div className="question-answers">
        <div className="question--answer">Adios</div>
        <div className="question--answer">Hola</div>
        <div className="question--answer">Au Revoir</div>
        <div className="question--answer">Salir</div>
      </div>
    </div>
  );
}

export default Question;
