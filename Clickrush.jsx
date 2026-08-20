import { useEffect, useState } from "react";

export default function ClickRush() {
  const [time, setTime] =
    useState(10);

  const [score, setScore] =
    useState(0);

  const [running, setRunning] =
    useState(false);

  useEffect(() => {
    if (!running) return;

    if (time <= 0) {
      setRunning(false);
      return;
    }

    const timer =
      setTimeout(() => {
        setTime(
          value => value - 1
        );
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, [running, time]);

  function start() {
    setScore(0);
    setTime(10);
    setRunning(true);
  }

  return (
    <div className="click-game">

      <span className="eyebrow">
        REACTION TEST
      </span>

      <h1>
        CLICK RUSH
      </h1>

      <p className="muted">
        Click as many times as possible.
      </p>

      <div className="click-timer">
        {time}
      </div>

      <button
        className="click-target"
        disabled={
          !running ||
          time <= 0
        }
        onClick={() =>
          setScore(
            value => value + 1
          )
        }
      >
        {running
          ? "CLICK"
          : time <= 0
          ? "DONE"
          : "START"}
      </button>

      <div className="click-score">
        SCORE {score}
      </div>

      {!running && (
        <button
          className="secondary-button"
          onClick={start}
        >
          {time <= 0
            ? "PLAY AGAIN"
            : "START RUN"}
        </button>
      )}
    </div>
  );
}
