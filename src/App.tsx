// IMPORTS
import { useState, useEffect, useMemo, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/features/auth/authApi";
import { setUserID, logout } from "@/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/usePreTypesHooks";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { useIdleTimer } from "react-idle-timer";
import { jwtDecode } from "jwt-decode";
import SearchIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/CloseRounded";
import { JwtPayload } from "jwt-decode";
import { toastConfig } from "@/config/toast/toast-config";
import { Header } from "@/shared/components/Header";
import { SearchScreen } from "./screens/SearchScreen";
import { CustomModal } from "./shared/components/CustomModal";
import useToggleState from "./hooks/useToggleState";
import { SEARCH } from "./constants/const";

function App() {
  const dispatch = useAppDispatch();

  const theme = createTheme({
    typography: {
      fontFamily: "IranYekan",
    },
  });

  // LOGOUT USER AFTER 30mins OF INACTIVITY
  // USER ACTIVITY STATES
  const [isActive, setIsActive] = useState(true);
  const [, setRemaining] = useState(0);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState("");
  //   const [search, setSearch] = useState(false);
  const [search, toggleSearch] = useToggleState(false);

  // CONSTS
  const [logoutApi] = useLogoutMutation();
  const { refreshToken } = useAppSelector((state) => state.auth);
  const { token } = useAppSelector((state) => state.auth);
  const { navPanelOpen } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/retirement/" ||
    location.pathname === "/retirement/login";
  //   const { logoutHandler } = useLogout();

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
    console.log("LOGOUT response:", res);
    toastConfig.success(res.data.message);
  }, [refreshToken, dispatch, logoutApi]);

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000 * 60 * 30,
    // timeout: 10000,
    throttle: 500,
  });

  useEffect(() => {
    if (!token) {
      navigate("/retirement/");
    } else {
      const decodedToken = jwtDecode(token) as JwtPayload & {
        name: string;
        familyName: string;
        id: string;
      };
      setFirstName(decodedToken.name);
      setLastName(decodedToken.familyName);
      dispatch(setUserID(decodedToken.id));
    }
  }, [token, navigate, isLoginPage, dispatch]);

  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 2000));
      }, 500);
      if (!isActive) {
        logoutHandler();
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [getRemainingTime, isActive, logoutHandler, token]);

  const ToastProvider = useMemo(() => toastConfig.registerProvider, []);

  return (
    <ThemeProvider theme={theme}>
      {!isLoginPage && <Header firstName={firstName} lastName={lastName} />}

      <CustomModal title={SEARCH} open={search} fullScreen={true}>
        <SearchScreen />
      </CustomModal>
      <main
        className={!isLoginPage ? "main" : ""}
        style={{
          marginTop:
            navPanelOpen && !isLoginPage
              ? "220px"
              : !navPanelOpen && !isLoginPage
              ? "170px"
              : "0px",
          overflowY: search ? "hidden" : "visible",
        }}
      >
        <Outlet />
      </main>

      {!isLoginPage && (
        <div onClick={toggleSearch} className="search-btn">
          {search ? <CloseIcon /> : <SearchIcon />}
        </div>
      )}

      <ToastProvider />
    </ThemeProvider>
  );
}

export default App;
