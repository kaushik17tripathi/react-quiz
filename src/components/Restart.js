import { useQuiz } from "../contexts/QuizContext"

function Restart() {
  const {dispatch}=useQuiz()
  return (
  <button className="btn btn-ui" onClick={()=>dispatch({type:'restart'})}>Restart quiz</button>
  )
}

export default Restart
