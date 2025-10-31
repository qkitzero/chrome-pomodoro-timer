
import { useState, useEffect } from "react";

export const useChromeStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    chrome.storage.local.get([key], (res) => {
      setValue(res[key] ?? initialValue);
    });

    const storageListener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes[key]) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(storageListener);

    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, [key, initialValue]);

  const updateValue = (newValue: T) => {
    chrome.storage.local.set({ [key]: newValue });
  };

  return [value, updateValue] as const;
};
