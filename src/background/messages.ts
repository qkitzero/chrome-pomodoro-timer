import { startTimer, pauseTimer, resetTimer } from "./timer";

export const messageListener = (message: { command: string }) => {
  if (message.command === "start") {
    startTimer();
  } else if (message.command === "pause") {
    pauseTimer();
  } else if (message.command === "reset") {
    resetTimer();
  }
};
