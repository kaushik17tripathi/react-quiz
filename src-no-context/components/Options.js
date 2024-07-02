function Options({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => {
          return (
            <button
              className={`btn btn-option ${i === answer ? 'answer' : ''} ${
                answer !== null
                  ? i === question.correctOption
                    ? 'correct'
                    : 'wrong'
                  : ''
              }`}
              key={option}
              disabled={answer !== null}
              onClick={() => dispatch({ type: 'newAnswer', payload: i })}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Options;
