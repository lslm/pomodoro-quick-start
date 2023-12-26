import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(1500); // Tempo inicial em segundos (25 minutos)
  const [isActive, setIsActive] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const workTime = 1500; // Tempo de trabalho em segundos (25 minutos)
  const breakTime = 300; // Tempo de pausa em segundos (5 minutos)
  const longBreakTime = 900; // Tempo de pausa longa em segundos (15 minutos)
  const sessionsSequences = [1, 2, 1, 2, 1, 2, 1, 3]; // Sequência de sessões de trabalho e pausa. 1 = trabalho, 2 = pausa curta, 3 = pausa longa

  const { currentTask } = useContext(TaskContext);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    if (seconds === 0) {
      setIsActive(false);
      changeSession();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    setCurrentSessionIndex(0);
    setSeconds(workTime);
    setIsActive(false);
  }, [currentTask])

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const resetTimer = () => {
    const currentSession = sessionsSequences[currentSessionIndex];

    if (currentSession === 1) {
      setSeconds(workTime);
      setIsActive(false);
    } else if (currentSession === 2) {
      setSeconds(breakTime);
      setIsActive(false);
    } else {
      setSeconds(longBreakTime);
      setIsActive(false);
    }
  }

  const changeSession = () => {
    let nextSessionIndex;

    if (currentSessionIndex + 1 < sessionsSequences.length) {
      nextSessionIndex = currentSessionIndex + 1;
    } else {
      nextSessionIndex = 0;
    }

    setCurrentSessionIndex(nextSessionIndex);

    const nextSession = sessionsSequences[nextSessionIndex];

    if (nextSession === 1) {
      setSeconds(workTime);
    } else if (nextSession === 2) {
      setSeconds(breakTime);
    } else {
      setSeconds(longBreakTime);
    }
  }

  const currentSessionClass = () => {
    const currentSession = sessionsSequences[currentSessionIndex];

    if (!isActive) {
      return 'title';
    }

    if (currentSession === 1) {
      return 'title work';
    } else {
      return 'title break';
    }
  }

  const currentSessionTimerClass = () => {
    const currentSession = sessionsSequences[currentSessionIndex];

    if (!isActive) {
      return 'timer';
    }

    if (currentSession === 1) {
      return 'timer timer-work';
    } else {
      return 'timer timer-break';
    }
  }

  return (
    <div className="pomodoro">
    { currentTask &&
      <>
        <div className={ currentSessionClass() }>
          <h3>{ currentTask.title }</h3>
        </div>

        <p className={ currentSessionTimerClass() }>{formatTime(seconds)}</p>

        <div className='actions'>
          <button className='button start-button' onClick={toggleTimer}>{isActive ? 'Pausar' : 'Iniciar'}</button>

          { !isActive &&
            <button className='button stop-button' onClick={resetTimer}>Parar</button>
          }
          { isActive &&
            <button className='button stop-button' onClick={changeSession}>Pular</button>
          }

        </div>
      </>
    }
    </div>
  );
};

export default PomodoroTimer;
