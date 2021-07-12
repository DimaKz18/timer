import React, { useEffect, useState } from 'react' 
import './Timer.css'
const START = 'START'
const STOP = 'STOP'
const WAIT = 'WAIT'
const RESET = 'RESET'

const Timer = React.memo(() => {
    const[status, setStatus] = useState('stop')
    const[seconds, setSeconds] = useState(0)
    const[minutes, setMinutes] = useState(0)
    const[hours, setHours] = useState(0)

    const onStartTimer = () => {
      setStatus('START');
    };
    const onStopTimer = () => {
      setStatus('STOP');
    };
    const onWaitTimer = (e) => {
      setTimeout(() => {
          setStatus('WAIT');
      }, 300);
    };
    const onResetTimer = () => {
      setStatus('RESET')
    };
    useEffect(()=>{
        switch(status) {
            case START:
                if(seconds === 59) {
                    setTimeout(() => {
                        setSeconds(0);
                        setMinutes(minutes+1)
                      }, 1000);
                }
                else if(minutes === 59) {
                    setTimeout(() => {
                        setSeconds(0)
                        setMinutes(0);
                        setHours(hours+1)
                      }, 1000);
                } else {
                    setTimeout(() => {
                        setSeconds(seconds + 1);
                      }, 1000);
                }
                break;
            case STOP:
                setSeconds(0)
                setMinutes(0)
                setHours(0)
                break;
            case RESET:
                setStatus('STOP')
                setTimeout(()=>{
                    setStatus('START')                
                }, 1000)
            default:
        }
    }, [status, seconds, minutes, hours])
    return (
        <div>
            <div className='timer-display'>
                <p>{hours}</p>
                <p>{minutes}</p>
                <p>{seconds}</p>
            </div>
            <div className='timer-btns'>
                <button className='timer-btns-btn green-bg' onClick={onStartTimer}>Start</button>
                <button className='timer-btns-btn red-bg'onClick={onStopTimer}>Stop</button>
                <button className='timer-btns-btn blue-bg'onClick={onWaitTimer}>Wait</button>
                <button className='timer-btns-btn orange-bg'onClick={onResetTimer}>Reset</button>
            </div>
        </div>
    )
})

export default Timer