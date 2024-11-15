// IMPORTS
import { useState, useEffect, useMemo } from "react";
import useLogout from "@/hooks/useLogout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersonTableData } from "@/slices/personDataSlice";
import { setUserID } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { useIdleTimer } from "react-idle-timer";
import { jwtDecode } from "jwt-decode";
import { CiSearch } from "react-icons/ci";
import { JwtPayload } from "jwt-decode";
import { toastConfig } from "@/config/toast/toast-config";
import Header from "@/components/Header";
import SearchScreen from "@/screens/SearchScreen";

function App() {
  const dispatch = useDispatch();

  const theme = createTheme({
    typography: {
      fontSize: 14,
    },
  });

  // LOGOUT USER AFTER 30mins OF INACTIVITY
  // USER ACTIVITY STATES
  const [isActive, setIsActive] = useState(true);
  const [remaining, setRemaining] = useState(0);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState("");
  const [search, setSearch] = useState(false);

  const { token } = useAppSelector((state) => state.auth);
  const { navPanelOpen } = useAppSelector((state) => state.themeData);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/retirement/" ||
    location.pathname === "/retirement/login";
  const { logoutHandler } = useLogout();

  const onIdle = () => {
    setIsActive(false);
  };

  const onActive = () => {
    setIsActive(true);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 1000 * 60 * 30,
    // timeout: 1000,
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
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, 500);
      if (!isActive) {
        logoutHandler();
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [getRemainingTime, isActive, token, logoutHandler]);

  // CLEAR THE PERSONNEL GRID WHEN USERS NAVIGATE TO OTHER ROUTES
  useEffect(() => {
    const allowedRoutes = [
      "/retirement/personnel-statements",
      "/retirement/personnel-statements/info",
    ];

    if (!allowedRoutes.includes(location.pathname)) {
      dispatch(setPersonTableData([]));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleSearchClick = () => {
    setSearch(true);
  };

  const ToastProvider = useMemo(() => toastConfig.registerProvider, []);

  return (
    <ThemeProvider theme={theme}>
      {!isLoginPage && <Header firstName={firstName} lastName={lastName} />}
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
      {search ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            bottom: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: "9999",
          }}
        >
          <SearchScreen setSearch={setSearch} />
        </div>
      ) : !isLoginPage ? (
        <div onClick={handleSearchClick} className="search-btn">
          <CiSearch />
        </div>
      ) : null}

      <ToastProvider />
    </ThemeProvider>
  );
}

export default App;
