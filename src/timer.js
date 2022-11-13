import React ,  { useEffect, useRef, useState } from 'react';


const SPEED = 1000;

const TimerClock = ({mint, sec, start }) => {

    const [startTimer, setStartTimer] = useState(false)
    const [timer , setTimer]  = useState({mint:mint, sec:sec,  progressStart:0, progressEnd: mint*60+sec});
    const progressInterval = useRef()
    const progressBarElm = useRef()

    const trackProgress = () => {
        setTimer((prevState) => {
            let currentProgress = prevState.progressStart++;
            let secRem = Math.floor((prevState.progressEnd - currentProgress) % 60);
            let minRem = Math.floor((prevState.progressEnd - currentProgress) / 60);
            let secRemStr = secRem.toString().length == 2 ? secRem : `0${secRem}`;
            let mintRemStr = minRem.toString().length == 2 ? minRem : `0${minRem}`;
            let degTravel = 360 / prevState.progressEnd;
            let progressBarElement = progressBarElm.current;
            progressBarElement.style.background = `conic-gradient(
            #9d0000 ${currentProgress * degTravel}deg,
            #17171a ${currentProgress * degTravel}deg
          )`;

            return {
                ...prevState,
                mint: mintRemStr,
                sec: secRemStr,
                progressStart: currentProgress
            };
        });
    }

    useEffect(() => {
        if (timer.progressStart == timer.progressEnd) {
            let progressBarElement = progressBarElm.current;
            progressBarElement.style.background = `conic-gradient(
                #00aa51 360deg,
                #00aa51 360deg
              )`;
              setStartTimer((prevState) => {
                  return !prevState
              })
          }
      }, [timer]); 

    useEffect(() => {

        if(startTimer) {
            progressInterval.current = setInterval(trackProgress, SPEED);
        }
        else{
            clearInterval(progressInterval.current);
        }
      }, [ startTimer]);

    useEffect(() => {
        setStartTimer(start)
      }, [start]); 
         
    
  
    return (
        <div ref={progressBarElm} className="outerRing">
        <div className="timer">
          <div id="time">
            <span >{timer.mint}</span>
            <span id="colon">:</span>
            <span >{timer.sec}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default TimerClock;