// IMPORTS
import { useState, useCallback } from "react";

const useToggleState = (initialState: boolean) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const toggleFalse = useCallback(() => {
    setState(false);
  }, []);

  const toggleTrue = useCallback(() => {
    setState(true);
  }, []);

  return [state, toggle, toggleFalse, toggleTrue] as const;
};

export default useToggleState;
