import React, { useState, useEffect } from "react";
import styles from "./Promodoro.module.css";

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsResting(true);
      setTime(5 * 60); // 5 minute rest period
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  const label = isResting ? "Rest" : "Work";

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>{label}</h1>
      <p className={styles.timer}>{`${minutes}:${seconds}`}</p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setIsActive(false);
            setIsResting(false);
            setTime(25 * 60);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
