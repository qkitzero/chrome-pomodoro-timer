import { POMODORO_TIME } from "../background/timer";
import { messageListener } from "./messages";

chrome.storage.local.get(["timeLeft", "isRunning"], (res) => {
  chrome.storage.local.set({
    timeLeft: "timeLeft" in res ? res.timeLeft : POMODORO_TIME,
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
        const timeLeft = res.timeLeft - 1;
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

chrome.runtime.onMessage.addListener(messageListener);
