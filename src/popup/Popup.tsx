import { useChromeStorage } from "./useChromeStorage";
import { POMODORO_TIME } from "../background/timer";

export const Popup = () => {
  const [time, setTime] = useChromeStorage("timeLeft", POMODORO_TIME);
  const [isRunning, setIsRunning] = useChromeStorage("isRunning", false);

  const toggle = () => {
    const command = !isRunning ? "start" : "pause";
    chrome.runtime.sendMessage({ command });
  };

  const reset = () => {
    chrome.runtime.sendMessage({ command: "reset" });
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
