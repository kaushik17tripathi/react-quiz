import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Restart from './Restart';
import Timer from './Timer';
import Footer from './Footer';

const SECS_PER_QUESTION = 30;

const initialStates = {
  questions: [],
  status: 'Loading',
  //loading error ready active finished
  index: 0,
  answer: null,
  points: 0,
  highScore: 0, //this is also a piece of state as we need it to be remembered during re-renders
  secondsRemaining: null,
};

function reducer(states, { type, payload }) {
  switch (type) {
    case 'dataReceived':
      return { ...states, questions: payload, status: 'ready' };
    case 'dataFailed':
      return { ...states, status: 'error' };
    case 'startQuiz':
      return {
        ...states,
        status: 'active',
        secondsRemaining: states.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = states.questions.at(states.index);

      return {
        ...states,
        answer: payload,
        points:
          payload === question.correctOption
            ? states.points + question.points
            : states.points,
      };
    case 'nextQuestion':
      return { ...states, answer: null, index: states.index + 1 };
    case 'finish':
      return {
        ...states,
        status: 'finished',
        highScore:
          states.points > states.highScore ? states.points : states.highScore,
      };
    case 'restart':
      return {
        ...initialStates,
        status: 'ready',
        questions: states.questions,
      };
    //or
    // return { ...states, status: 'ready', index: 0, answer: null, points: 0 };
    case 'tick':
      return {
        ...states,
        secondsRemaining: states.secondsRemaining - 1,
        status: states.secondsRemaining === 0 ? 'finished' : states.status,
      };
    default:
      throw new Error('Something went wrong');
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialStates);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const ques = await fetch('http://localhost:8000/questions').then(
          (res) =>
            res
              .json()
              .then((data) => dispatch({ type: 'dataReceived', payload: data }))
        );
      } catch (err) {
        dispatch({ type: 'dataFailed' });
      }
      // console.log(ques);
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'Loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishScreen
              points={points}
              maxPoints={maxPoints}
              highScore={highScore}
            />
            <Restart dispatch={dispatch} secondsRemaining={secondsRemaining} />
          </>
        )}
      </Main>
    </div>
  );
}
