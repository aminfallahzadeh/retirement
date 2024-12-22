// IMPORTS
import { useEffect } from "react";

export const useEnterToSubmit = () => {
  useEffect(() => {
    const handleEnterKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const form = document.getElementById("authorize-form");
        if (form) {
          (form as HTMLFormElement).requestSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleEnterKey);

    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, []);
};
