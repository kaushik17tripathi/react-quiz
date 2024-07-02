import { useQuiz } from '../contexts/QuizContext';

function Options() {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];
  return (
    <div>
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
    </div>
  );
}

export default Options;
