// IMPORTS
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import "./index.css";
import { Provider } from "react-redux";
import store from "@/config/redux/store";
import { setConfig } from "@/features/api/configSlice";
import { AppRouter } from "./routers/AppRouter";

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
        <AppRouter />
      </Provider>
    </React.StrictMode>
  );
})();
