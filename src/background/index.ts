chrome.storage.local.get(["timeLeft", "isRunning"], (res) => {
  chrome.storage.local.set({
    timeLeft: "timeLeft" in res ? res.timeLeft : 25 * 60,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});

chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timeLeft", "isRunning"], (res) => {
      if (res.isRunning) {
        let timeLeft = res.timeLeft - 1;
        if (timeLeft <= 0) {
          chrome.storage.local.set({ isRunning: false, timeLeft: 0 });
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon128.png",
            title: "Time is up!",
            message: "Your pomodoro session has ended.",
            priority: 2,
          });
        } else {
          chrome.storage.local.set({ timeLeft });
        }
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    chrome.storage.local.set({ isRunning: true }, () => {
      sendResponse({ isRunning: true });
    });
  } else if (message.command === "pause") {
    chrome.storage.local.set({ isRunning: false }, () => {
      sendResponse({ isRunning: false });
    });
  } else if (message.command === "reset") {
    chrome.storage.local.set({ timeLeft: 25 * 60, isRunning: false }, () => {
      sendResponse({ timeLeft: 25 * 60, isRunning: false });
    });
  }
  return true;
});
