import Cookies from "js-cookie";
import { useState } from "react";

export const useCookie = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = Cookies.get(keyName);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue, options, remember) => {
    try {
      if (remember) {
        Cookies.set(keyName, JSON.stringify(newValue), options);
      }
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };

  const removeValue = () => {
    try {
      Cookies.remove(keyName);
    } catch (err) {
      console.error(err);
    }
    setStoredValue(null);
  };

  return [storedValue, setValue, removeValue];
};
