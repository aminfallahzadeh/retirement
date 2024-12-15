// IMPORTS
import { useState, useEffect, useMemo, useCallback } from "react";
import { useLogoutMutation } from "@/features/auth/authApi";
import { logout } from "@/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/usePreTypesHooks";
import "react-toastify/dist/ReactToastify.css";
import { useIdleTimer } from "react-idle-timer";
import { toastConfig } from "@/config/toast/toast-config";
import { AppRouter } from "./routers/AppRouter";

function App() {
  const dispatch = useAppDispatch();

  // LOGOUT USER AFTER 30mins OF INACTIVITY
  // USER ACTIVITY STATES
  const [isActive, setIsActive] = useState(true);

  // CONSTS
  const { refreshToken } = useAppSelector((state) => state.auth);
  const [logoutApi] = useLogoutMutation();
  const { token } = useAppSelector((state) => state.auth);

  const onIdle = () => {
    setIsActive(false);
  };

  const onActive = () => {
    setIsActive(true);
  };

  // LOGOUT FUNCTION
  const logoutHandler = useCallback(async () => {
    const res = await logoutApi({ refreshToken });
    dispatch(logout());
    toastConfig.success(res.data.message);
  }, [dispatch, logoutApi, refreshToken]);

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000 * 60 * 30,
    // timeout: 10000,
    throttle: 500,
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
      "focus",
    ],
  });

  useEffect(() => {
    if (token && !isActive) {
      // FOR DEBUG
      //   const interval = setInterval(() => {
      //     console.log("USER IS INACTIVE", getRemainingTime());
      //   }, 500);
      logoutHandler();
      //   return () => {
      //     clearInterval(interval);
      //   };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRemainingTime, isActive, logoutHandler]);

  const ToastProvider = useMemo(() => toastConfig.registerProvider, []);

  return (
    <>
      <AppRouter />
      <ToastProvider />
    </>
  );
}

export default App;
