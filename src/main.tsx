// REACT IMPORTS
import ReactDOM from "react-dom/client";

// RRD
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

// STYLES
import "@/assets/styles/main.scss";

// REDUX
import { Provider } from "react-redux";
import store from "@/store";

// COMPONENTS
import App from "@/App";

// PAGES
import Login from "@/pages/Login.jsx";
import Error from "@/pages/Error";

// SCREENS
import CartableScreen from "@/screens/CartableScreen";
import CreateGroupScreen from "@/screens/CreateGroupScreen";
import CreateUserScreen from "@/screens/CreateUserScreen";
import RetiredScreen from "@/screens/RetiredScreen";
import GroupsScreen from "@/screens/GroupsScreen";
import UsersScreen from "@/screens/UsersScreen";
import RequestScreen from "@/screens/RequestScreen";
import BatchStatementsScreen from "@/screens/BatchStatementsScreen";
import PersonnelStatementsScreen from "@/screens/PersonnelStatementsScreen";
import ElectronicStatementScreen from "@/screens/ElectronicStatementScreen";
import CreateRequestScreen from "@/screens/CreateRequestScreen";
import PersonnelInfoScreen from "@/screens/PersonnelInfoScreen";
import FractionScreen from "@/screens/FractionScreen.jsx";
import ReportGeneratorScreen from "@/screens/ReportGeneratorScreen.jsx";
import BaseInfoScreen from "@/screens/BaseInfoScreen.jsx";
import BaseInfoScreen2 from "@/screens/BaseInfoScreen2.jsx";
import InsertAnnounceScreen from "@/screens/InsertAnnounceScreen.jsx";
import DashboardScreen from "@/screens/DashboardScreen.jsx";
import GroupSlipsScreen from "@/screens/GroupSlipsScreen.jsx";
import SalaryScreen from "@/screens/SalaryScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/retirement/" element={<App />}>
        <Route index path="/retirement/" element={<Login />} />

        <Route path="/retirement/cartable" element={<CartableScreen />} />

        <Route path="/retirement/retired" element={<RetiredScreen />} />

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
          element={<ElectronicStatementScreen />}
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

        <Route path="/retirement/base-info-2" element={<BaseInfoScreen2 />} />

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
