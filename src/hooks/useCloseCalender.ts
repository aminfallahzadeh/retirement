// IMPORTS
import { MutableRefObject, useEffect, Dispatch, SetStateAction } from "react";

const useCloseCalender = (
  calenderRefs: MutableRefObject<HTMLElement | null>[],
  setHandlers: Dispatch<SetStateAction<boolean>>[]
) => {
  useEffect(() => {
    const handleCloseCalender = (event: MouseEvent) => {
      const target = event.target as Node | null;
      calenderRefs.forEach((inputRef, index) => {
        if (inputRef.current && target && !inputRef.current.contains(target)) {
          setHandlers[index](false);
        }
      });
    };

    document.addEventListener("mousedown", handleCloseCalender);

    return () => {
      document.removeEventListener("mousedown", handleCloseCalender);
    };
  }, [calenderRefs, setHandlers]);
};

export { useCloseCalender };
