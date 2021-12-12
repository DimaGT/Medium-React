import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
