import { useQuiz } from '../contexts/QuizContext';

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();
  
  const handleClick = () => {
    dispatch({ type: 'startQuiz' }); //alway remember cannot update state in the render logic
  };
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <p className="progress">{`${numQuestions} questions to test your React mastery`}</p>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
