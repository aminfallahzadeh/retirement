// IMPORTS
import { lazy, createElement } from "react";
import { createSuspense } from "@/utils/suspenseCreator";
import { AppRoute } from "@/shared/types/route";
import AppLayout from "@/layouts/AppLayout/AppLayout";

const Cartable = lazy(() =>
  import("@/screens/Cartable").then((m) => ({ default: m.Cartable }))
);
const Auth = lazy(() => import("@/pages/Auth/Auth"));
const Retired = lazy(() => import("@/screens/Retired/Retired"));
const GroupsScreen = lazy(() => import("@/screens/GroupsScreen"));
const UsersScreen = lazy(() => import("@/screens/UsersScreen"));
const CreateGroupScreen = lazy(() => import("@/screens/CreateGroupScreen"));
const CreateUserScreen = lazy(() => import("@/screens/CreateUserScreen"));
const RequestScreen = lazy(() => import("@/screens/RequestScreen"));
const BatchStatementsScreen = lazy(
  () => import("@/screens/BatchStatementsScreen")
);
const Slips = lazy(() =>
  import("@/screens/Slips").then((m) => ({ default: m.Slips }))
);
const PersonnelStatements = lazy(() =>
  import("@/screens/PersonnelStatements").then((m) => ({
    default: m.PersonnelStatements,
  }))
);
const PersonnelInfoScreen = lazy(() => import("@/screens/PersonnelInfoScreen"));
const ElectronicStatement = lazy(
  () => import("@/screens/ElectronicStatement/ElectronicStatement")
);
// const CreateRequestScreen = lazy(() => import("@/screens/CreateRequestScreen"));
const CreateRequest = lazy(() =>
  import("@/screens/CreateRequest").then((m) => ({ default: m.CreateRequest }))
);
const FractionScreen = lazy(() => import("@/screens/FractionScreen"));
const ReportGeneratorScreen = lazy(
  () => import("@/screens/ReportGeneratorScreen")
);
const BaseInfoScreen = lazy(() => import("@/screens/BaseInfoScreen"));
const BaseInfo2 = lazy(() => import("@/screens/BaseInfo2/BaseInfo2"));
const InsertAnnounce = lazy(() => import("@/screens/InsertAnnounceScreen"));
const DashboardScreen = lazy(() => import("@/screens/DashboardScreen"));
const SalaryScreen = lazy(() => import("@/screens/SalaryScreen"));

export const ROUTES: AppRoute[] = [
  {
    id: 1,
    path: "/retirement/",
    element: createSuspense(Auth),
    index: true,
  },
  {
    id: 2,
    element: createElement(AppLayout),
    children: [
      {
        id: 100,
        path: "/retirement/cartable",
        element: createSuspense(Cartable, [], true),
        index: false,
      },
      {
        id: 101,
        path: "/retirement/retired",
        element: createSuspense(Retired, ["requestID", "personID"], true),
        index: false,
      },
      {
        id: 102,
        path: "/retirement/groups",
        element: createSuspense(GroupsScreen, [], true),
        index: false,
      },
      {
        id: 103,
        path: "/retirement/users",
        element: createSuspense(UsersScreen, [], true),
        index: false,
      },
      {
        id: 104,
        path: "/retirement/create-group",
        element: createSuspense(CreateGroupScreen, [], true),
        index: false,
      },
      {
        id: 105,
        path: "/retirement/create-user",
        element: createSuspense(CreateUserScreen, [], true),
        index: false,
      },
      {
        id: 106,
        path: "/retirement/request",
        element: createSuspense(RequestScreen, [], true),
        index: false,
      },
      {
        id: 107,
        path: "/retirement/batch-statements",
        element: createSuspense(BatchStatementsScreen, [], true),
        index: false,
      },
      {
        id: 108,
        path: "/retirement/group-slips",
        element: createSuspense(Slips, [], true),
        index: false,
      },
      {
        id: 109,
        path: "/retirement/personnel-statements",
        element: createSuspense(PersonnelStatements, [], true),
        index: false,
      },
      {
        id: 110,
        path: "/retirement/personnel-statements/info",
        element: createSuspense(PersonnelInfoScreen, [], true),
        index: false,
      },
      {
        id: 111,
        path: "/retirement/electronic-statement",
        element: createSuspense(ElectronicStatement, [], true),
        index: false,
      },
      {
        id: 112,
        path: "/retirement/electronic-statement",
        element: createSuspense(ElectronicStatement, [], true),
        index: false,
      },
      {
        id: 113,
        path: "/retirement/create-request",
        element: createSuspense(CreateRequest, ["role"], true),
        index: false,
      },
      {
        id: 114,
        path: "/retirement/fraction",
        element: createSuspense(FractionScreen, [], true),
        index: false,
      },
      {
        id: 115,
        path: "/retirement/report-creator",
        element: createSuspense(ReportGeneratorScreen, [], true),
        index: false,
      },
      {
        id: 116,
        path: "/retirement/base-info",
        element: createSuspense(BaseInfoScreen, [], true),
        index: false,
      },
      {
        id: 117,
        path: "/retirement/base-info2",
        element: createSuspense(BaseInfo2, [], true),
        index: false,
      },
      {
        id: 118,
        path: "/retirement/insert-announce",
        element: createSuspense(InsertAnnounce, [], true),
        index: false,
      },
      {
        id: 119,
        path: "/retirement/dashboard",
        element: createSuspense(DashboardScreen, [], true),
        index: false,
      },
      {
        id: 120,
        path: "/retirement/salary",
        element: createSuspense(SalaryScreen, [], true),
        index: false,
      },
    ],
  },
];
