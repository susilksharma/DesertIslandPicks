/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

//Custom usePersistedState hook
export const usePersistedState = (defaultValue, key) => {
  const [state, setState] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
