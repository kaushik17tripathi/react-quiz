function Restart({dispatch}) {
  return (
  <button className="btn btn-ui" onClick={()=>dispatch({type:'restart'})}>Restart quiz</button>
  )
}

export default Restart
