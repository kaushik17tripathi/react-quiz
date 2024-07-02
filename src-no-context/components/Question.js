import Options from "./Options";

function Question({ question,dispatch,answer }) {
  return (
    <div>
      <Options question={question } dispatch={dispatch} answer={answer}/>
    </div>
  );
}

export default Question;

// import { useReducer } from 'react';
// const initialStates = {
//   quesNo: 0,
//   points: 0,
// };

// function reducer({ quesNo, points }, { type, payload }) {
//   switch (type) {
//     case 'next':
//       return { quesNo: quesNo + 1, points };
//     case 'correctAnswer':
//       return {quesNo,points:points+payload}
//     case 'wrongAnswer':
//       return {quesNo,points}

//     default:
//       throw new Error('Something went wrong');
//   }
// }

// function Question({ numQuestions, questions }) {
//   const [{ quesNo, points }, dispatch] = useReducer(reducer, initialStates);

//   const handleClick = (value) => {
//     if (value === questions[quesNo].correctOption)
//       dispatch({ type: 'correctAnswer' ,payload:questions[quesNo].points});
//     else dispatch({ type: 'wrongAnswer' });
//   };

//   return (
//     <div>
//       <h3>{points}</h3>
//       <h3>{quesNo+1}</h3>
//       <h1>{questions[quesNo].question}</h1>
//       <div>
//         <ul>
//           <li>
//             <button
//               className="btn btn-ui options btn-option"
//               onClick={() => handleClick(0)}
//             >
//               {questions[quesNo].options[0]}
//             </button>
//           </li>
//           <li>
//             <button
//               className="btn btn-ui options btn-option"
//               onClick={() => handleClick(1)}
//             >
//               {questions[quesNo].options[1]}
//             </button>
//           </li>
//           <li>
//             <button
//               className="btn btn-ui options btn-option"
//               onClick={() => handleClick(2)}
//             >
//               {questions[quesNo].options[2]}
//             </button>
//           </li>
//           <li>
//             <button
//               className="btn btn-ui options btn-option"
//               onClick={() => handleClick(3)}
//             >
//               {questions[quesNo].options[3]}
//             </button>
//           </li>
//         </ul>
//       </div>
//       {quesNo==0||<button
//         className="btn btn-ui"
//         onClick={() => {
//           dispatch({ type: 'next' });
//         }}
//       >
//         Next
//       </button>}
//     </div>
//   );
// }

// export default Question;
