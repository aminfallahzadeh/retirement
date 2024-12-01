// IMPORTS
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "@/assets/styles/main.scss";
import "./index.css";
import { Provider } from "react-redux";
import store from "@/config/redux/store";
import App from "@/App";
import { Login } from "./pages/Login";
import { Error } from "./pages/Error";
import { Cartable } from "./screens/Cartable";
import { Retired } from "./screens/Retired";
import CreateGroupScreen from "@/screens/CreateGroupScreen";
import CreateUserScreen from "@/screens/CreateUserScreen";
import GroupsScreen from "@/screens/GroupsScreen";
import UsersScreen from "@/screens/UsersScreen";
import RequestScreen from "@/screens/RequestScreen";
import BatchStatementsScreen from "@/screens/BatchStatementsScreen";
import PersonnelStatementsScreen from "@/screens/PersonnelStatementsScreen";
import { ElectronicStatement } from "@/screens/ElectronicStatement";
import CreateRequestScreen from "@/screens/CreateRequestScreen";
import PersonnelInfoScreen from "@/screens/PersonnelInfoScreen";
import FractionScreen from "@/screens/FractionScreen";
import ReportGeneratorScreen from "@/screens/ReportGeneratorScreen";
import BaseInfoScreen from "@/screens/BaseInfoScreen";
import BaseInfoScreen2 from "@/screens/BaseInfoScreen2";
import InsertAnnounceScreen from "@/screens/InsertAnnounceScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import GroupSlipsScreen from "@/screens/GroupSlipsScreen";
import SalaryScreen from "@/screens/SalaryScreen";
import { setConfig } from "@/features/api/configSlice";
import TestPage from "./pages/TestPage";

const loadConfig = async (): Promise<void> => {
  try {
    const response = await fetch("./config.json");
    const config = await response.json();
    store.dispatch(setConfig(config));
  } catch (error) {
    console.error("Failed to load configuration:", error);
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/retirement/" element={<App />}>
        <Route index path="/retirement/" element={<Login />} />

        <Route path="/retirement/cartable" element={<Cartable />} />
        <Route path="/retirement/test" element={<TestPage />} />

        <Route path="/retirement/retired" element={<Retired />} />

        <Route path="/retirement/groups" element={<GroupsScreen />} />

        <Route path="/retirement/users" element={<UsersScreen />} />

        <Route
          path="/retirement/create-group"
          element={<CreateGroupScreen />}
        />

        <Route path="/retirement/create-user" element={<CreateUserScreen />} />

        <Route path="/retirement/request" element={<RequestScreen />} />

        <Route
          path="/retirement/batch-statements"
          element={<BatchStatementsScreen />}
        />

        <Route path="/retirement/group-slips" element={<GroupSlipsScreen />} />

        <Route
          path="/retirement/personnel-statements"
          element={<PersonnelStatementsScreen />}
        />

        <Route
          path="/retirement/personnel-statements/info"
          element={<PersonnelInfoScreen />}
        />

        <Route
          path="/retirement/electronic-statement"
          element={<ElectronicStatement />}
        />

        <Route
          path="/retirement/create-request"
          element={<CreateRequestScreen />}
        />

        <Route path="/retirement/fraction" element={<FractionScreen />} />

        <Route
          path="/retirement/report-creator"
          element={<ReportGeneratorScreen />}
        />

        <Route path="/retirement/base-info" element={<BaseInfoScreen />} />

        <Route path="/retirement/base-info2" element={<BaseInfoScreen2 />} />

        <Route
          path="/retirement/insert-announce"
          element={<InsertAnnounceScreen />}
        />

        <Route path="/retirement/dashboard" element={<DashboardScreen />} />

        <Route path="/retirement/salary" element={<SalaryScreen />} />
      </Route>
      <Route path="*" element={<Error />} />
    </>
  )
);

(async () => {
  await loadConfig();
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    // <React.StrictMode>
    // </React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
})();
