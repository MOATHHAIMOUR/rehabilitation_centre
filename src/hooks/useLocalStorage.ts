import { useState } from "react";

/**
 * Custom hook to manage local storage in React.
 * @param key The key to store the value in local storage.
 * @param initialValue The initial value to set if no value exists in local storage.
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Retrieve the stored value from local storage
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key ", key, error);
      return initialValue;
    }
  });

  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
