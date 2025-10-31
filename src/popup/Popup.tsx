import { useState, useEffect } from "react";

export const Popup = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["timeLeft", "isRunning"], (res) => {
      setTime(res.timeLeft ?? 25 * 60);
      setIsRunning(res.isRunning ?? false);
    });

    const storageListener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.timeLeft) {
        setTime(changes.timeLeft.newValue);
      }
      if (changes.isRunning) {
        setIsRunning(changes.isRunning.newValue);
      }
    };

    chrome.storage.onChanged.addListener(storageListener);

    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, []);

  const toggle = () => {
    const command = !isRunning ? "start" : "pause";
    chrome.runtime.sendMessage({ command }, (res) => {
      if (res) {
        setIsRunning(res.isRunning);
      }
    });
  };

  const reset = () => {
    chrome.runtime.sendMessage({ command: "reset" }, (res) => {
      if (res) {
        setTime(res.timeLeft);
        setIsRunning(res.isRunning);
      }
    });
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-80 text-center p-4">
      <div className="flex items-center justify-center text-2xl font-bold">
        Pomodoro Timer
        <img src="/icon32.png" className="ml-2" />
      </div>
      <div className="text-4xl my-4">{formatTime(time)}</div>
      <div className="flex justify-center">
        <button
          onClick={toggle}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mx-2"
        >
          {isRunning ? "Pause" : "Start"}
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
