// IMPORTS
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import "./index.css";
import { Provider } from "react-redux";
import store from "@/config/redux/store";
import { setConfig } from "@/features/api/configSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";

const theme = createTheme({
  typography: {
    fontFamily: "IranYekan",
  },
});

const loadConfig = async (): Promise<void> => {
  try {
    const response = await fetch("./config.json");
    const config = await response.json();
    store.dispatch(setConfig(config));
  } catch (error) {
    console.error("Failed to load configuration:", error);
  }
};

(async () => {
  await loadConfig();
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
})();
