import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

function Timer() {

  const { dispatch, secondsRemaining }=useQuiz()

  const mins= Math.floor(secondsRemaining/60);
  const seconds= secondsRemaining%60


  //we cannot use this effect in the app component as then the the timer will start as soon as the app mounts thats not want we , we want it to mount only when the quiz starts and as soon as the quiz starts the timer is mounted
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => clearInterval(id);//cleanup function to clear each tick
  }, [dispatch]);

  return <div className="timer">{mins<10&&'0'}{mins}:{seconds<10&&'0'}{seconds}</div>;
}

export default Timer;
