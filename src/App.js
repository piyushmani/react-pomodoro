import React ,  { useEffect, useRef, useState } from 'react';
import './App.css';
import TimerClock from "./timer";

const TASK_DURATION = {mint:0, sec:10}
const SHORT_BREAK_DURATION = {mint:0, sec:3}
const LONG_BREAK_DURATION = {mint:0, sec:5}

function App() {

  const [tasks, setTasks] = useState([])
  const [startTimer, setStartTimer] = useState({start:false, duration:TASK_DURATION})
  const inputElRef = useRef()
  const completed_task = useState(0)
  const timerInterval = useRef()
  
  const AddTask=()=>{
    let task = {name:inputElRef.current.value, finished:false}
    setTasks(prevArray => [...prevArray, task])
    inputElRef.current.value=''
  }

  const startTask =(index)=>{
    setTimeout(()=>{
      setStartTimer((prevState)=>{
        return {
          ...prevState,
          start:false
        }
      })
    } , (TASK_DURATION.mint*60+TASK_DURATION.sec)*1000)
    setStartTimer((prevState)=>{
      return {
        ...prevState,
        duration:TASK_DURATION,
        start:true
      }
    })
    
  }

  return (
    <div className="App">
      <div className='container'>
        <div className="left_container">

          <div>
            <input
              type="text"
              ref={inputElRef}
            />
            <button className='button button-2' onClick={AddTask}> Add Task</button>

          </div>

          <div>
            <ul>
            {tasks.map(function (item, i) {
              return <li key={i}>{item.name} <button className='button button-3' onClick={()=>startTask(i)}>Start</button></li>;
            })}
            </ul>
          </div>

        </div>
        <div className="right_container">
          <TimerClock mint={startTimer.duration.mint} sec={startTimer.duration.sec} start={startTimer.start}/>
        </div>
      </div>

    </div>
  );
}

export default App;
