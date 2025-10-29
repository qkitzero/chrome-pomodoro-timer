import { useState, useEffect } from "react";

export const Popup = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    } else if (time === 0) {
      clearInterval(interval);
      alert("Time's up!");
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setTime(25 * 60);
    setIsActive(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-50 text-center p-4">
      <div className="text-2xl font-bold">Pomodoro Timer</div>
      <div className="text-3xl my-4">{formatTime(time)}</div>
      <div className="flex">
        <button
          onClick={toggle}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
