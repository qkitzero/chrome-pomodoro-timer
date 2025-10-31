export const POMODORO_TIME = 25 * 60;

export const startTimer = () => {
  chrome.storage.local.set({ isRunning: true });
};

export const pauseTimer = () => {
  chrome.storage.local.set({ isRunning: false });
};

export const resetTimer = () => {
  chrome.storage.local.set({ timeLeft: POMODORO_TIME, isRunning: false });
};
