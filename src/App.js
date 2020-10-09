//FIX THE DIVITION
import React, { useState } from 'react';
import { render } from '@testing-library/react';


function App () {
  const values = ['0','1','2','3','4','5','6','7','8','9','.'];// an array of values i'll render with a function later
  const mathematics = ['-','+','/','*'];

  const rx = /^\d+\.?\d*$/; //a regex wich expect start with a number, can have a dot and finish with a number!

  let [current , setCurrent]=useState('');//state for the current value in the calculator. //El estado para el valor actual en la calculadora

  let [result , setResult]=useState(0);//state for the result of the operation//Estado para el resultado de la operación

  let [helpValue, setHelp]=useState('');

  let [error, setError]=useState(false);//if there's an error use this error
  let [instructions, setInstructions]= useState(false);//state to render instructions

  let [operator, setOperator] = useState('');

 const buttons = values.map((val)=> 
  <button /*this function use the array called 'values' and then display a list of buttons within a div, with the help of map*/
    onClick={()=> (rx.test(current + val)   ? setCurrent(current + val) && operator.length === 0 : alert("There's an error"))} //if the functions
    key={val}>
    {val}
  </button>
 );
 
 
 const CleanUp = () => {
   const functionality = () => { // this function set the state result to 0 and also the state current, wich are use for the operations
     setCurrent(current = '');
     setResult(result = 0);
     setOperator(operator = '');
     setHelp(helpValue = '');
   }
   return (<button onClick={functionality}>Clean</button>);
 }

 const setStates = () => {//this function put all states in empty.
  setCurrent('');
  setHelp('');
  setOperator('');
 }

 const Operations = props => {
  const use = () => {
    if (mathematics.includes(props.val)) {
      if (result == 0 && current == 0 && helpValue == 0 ) {
        alert('Please start with a number :(')
      }
      else if(operator.length>0) {
        alert('Please use numbers or equal operator');
      }
      else if (result == 0) {
       setHelp(current);
       setCurrent('');
       setOperator(props.val);
       }
       else{
        setHelp(result);
        setOperator(props.val);                
       }
    }
    else {//este else funciona si es igual a =
      //function for + operator
      if(operator === '+' && result == 0 && current > 0) {
        setResult(parseInt(helpValue) + parseInt(current));
        setStates();
      } else if (operator == '+' && result != 0 ){
        setResult(parseInt(result) + parseInt(current));
        setStates();
      }
      //function for - operator
      if(operator === '-' && result == 0 && current > 0) {
        setResult(parseInt(helpValue) - parseInt(current));
        setStates();
      } 
        else if (operator == '-' && result != 0 ){
        setResult(parseInt(result) - parseInt(current));
        setStates();
      }

      //function for / operator
      if(operator === '/' && result == 0 && current > 0) {
        setResult(parseInt(helpValue) / parseInt(current));
        setStates();
      } else if (operator == '/' && result != 0 ){
        setResult(parseInt(result) / parseInt(current));
        setStates()
      } 
      //function for * operator
      if(operator === '*' && result == 0 && current > 0) {
        setResult(parseInt(helpValue) * parseInt(current));
        setStates();
      } else if (operator == '*' && result != 0 ){
        setResult(parseInt(result) * parseInt(current));
        setStates();
      }
    }
    }
  
   
   return (
   <button onClick={use}>{props.val}</button>
   ) 
  }


 const DisplayDescription = () =>  {
   const renderInstructions = () => setInstructions(instructions = !instructions); //this function render our instructions if the button are clicked, and
   //hide the instructions if was clicked 
  if (instructions===true) {
    return (
    <div>
      <button onClick={renderInstructions}>Hide</button>
      <p>Hi there ! Here is the instructions of the "Calcupletos".</p>
      <ol>
        <li>Press your digits!</li>
        <li>Use a mathematic operator! The value will be keep in memory</li>
        <li>Again insert your digits!</li>
        <li>Now press equal operator! Tada!</li>
        <li>If you made a mistake, don't worry, Calcupletos will help you!</li>
        <li>If you want to clean up everything just click on "Clean"!</li>
      </ol>
    </div>);
  }
  else {
  return (
    <button onClick={renderInstructions}>Help</button>
  )
}
 }



 return (
   <div className="container2">
  <h1>Calcupletos</h1>
   <div className="container">  
     
     
     
     <div classname="actual">
        <h3>Result : {result}</h3>
        <h3>Operation : {helpValue}  {operator}  {current}</h3>
        <label>Current value : 
        <input value={current}/>
        </label>
     </div>
     <div className="buttons">
        {buttons}
        <Operations val='+'/>
        <Operations val='-'/>
        <Operations val='*'/>
        <Operations val='/'/>
        <Operations val='='/>
        <CleanUp/>
     </div>
   </div>
   <div className="desc">
   <DisplayDescription className="x"/>
   </div>
   </div>
 )

 }
export default App;
