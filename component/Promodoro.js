import React, { useState, useEffect } from "react";
import styles from "./Promodoro.module.css";

const Pomodoro = () => {
  const [workTime, setWorkTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [intervals, setIntervals] = useState(4);
  const [time, setTime] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0 && !isResting && sessionCount < intervals - 1) {
      setIsActive(false);
      setIsResting(true);
      setTime(restTime * 60);
      setSessionCount(sessionCount + 1);
    } else if (time === 0 && isResting && sessionCount < intervals - 1) {
      setIsActive(false);
      setIsResting(false);
      setTime(workTime * 60);
    } else if (time === 0 && !isResting && sessionCount === intervals - 1) {
      setIsActive(false);
      setIsResting(true);
      setTime(20 * 60);
      setSessionCount(0);
    }

    return () => clearInterval(interval);
  }, [isActive, isResting, intervals, restTime, sessionCount, time, workTime]);

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  const label = isResting ? "Rest" : "Work";

  const handleStart = () => {
    setIsActive(true);
    setTime(workTime * 60);
    setIsResting(false);
    setSessionCount(0);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsResting(false);
    setTime(workTime * 60);
    setSessionCount(0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>{label}</h1>
      <p className={styles.timer}>{`${minutes}:${seconds}`}</p>
      <div className={styles.inputContainer}>
        <label htmlFor="workTimeInput">Work Time (minutes):</label>
        <input
          id="workTimeInput"
          type="number"
          value={workTime}
          onChange={(e) => setWorkTime(parseInt(e.target.value))}
        />
        <label htmlFor="restTimeInput">Rest Time (minutes):</label>
        <input
          id="restTimeInput"
          type="number"
          value={restTime}
          onChange={(e) => setRestTime(parseInt(e.target.value))}
        />
        <label htmlFor="intervalsInput">Intervals:</label>
        <input
          id="intervalsInput"
          type="number"
          value={intervals}
          onChange={(e) => setIntervals(parseInt(e.target.value))}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={handleStart}
          disabled={isActive}
        >
          Start
        </button>
        <button className={styles.button} onClick={() => setIsActive(false)}>
          Pause
        </button>
        <button className={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
