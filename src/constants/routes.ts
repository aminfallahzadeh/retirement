// IMPORTS
import { lazy } from "react";
import { createSuspense } from "@/utils/suspenseCreator";

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
const CreateRequestScreen = lazy(() => import("@/screens/CreateRequestScreen"));
const FractionScreen = lazy(() => import("@/screens/FractionScreen"));
const ReportGeneratorScreen = lazy(
  () => import("@/screens/ReportGeneratorScreen")
);
const BaseInfoScreen = lazy(() => import("@/screens/BaseInfoScreen"));
const BaseInfo2 = lazy(() => import("@/screens/BaseInfo2/BaseInfo2"));
const InsertAnnounce = lazy(() => import("@/screens/InsertAnnounceScreen"));
const DashboardScreen = lazy(() => import("@/screens/DashboardScreen"));
const SalaryScreen = lazy(() => import("@/screens/SalaryScreen"));

export const ROUTES = [
  {
    id: 1,
    path: "/retirement/",
    element: createSuspense(Auth),
    index: true,
  },
  {
    id: 2,
    path: "/retirement/cartable",
    element: createSuspense(Cartable),
    index: false,
  },
  {
    id: 3,
    path: "/retirement/retired",
    element: createSuspense(Retired),
    index: false,
  },
  {
    id: 4,
    path: "/retirement/groups",
    element: createSuspense(GroupsScreen),
    index: false,
  },
  {
    id: 5,
    path: "/retirement/users",
    element: createSuspense(UsersScreen),
    index: false,
  },
  {
    id: 6,
    path: "/retirement/create-group",
    element: createSuspense(CreateGroupScreen),
    index: false,
  },
  {
    id: 7,
    path: "/retirement/create-user",
    element: createSuspense(CreateUserScreen),
    index: false,
  },
  {
    id: 8,
    path: "/retirement/request",
    element: createSuspense(RequestScreen),
    index: false,
  },
  {
    id: 9,
    path: "/retirement/batch-statements",
    element: createSuspense(BatchStatementsScreen),
    index: false,
  },
  {
    id: 10,
    path: "/retirement/group-slips",
    element: createSuspense(Slips),
    index: false,
  },
  {
    id: 11,
    path: "/retirement/personnel-statements",
    element: createSuspense(PersonnelStatements),
    index: false,
  },
  {
    id: 12,
    path: "/retirement/personnel-statements/info",
    element: createSuspense(PersonnelInfoScreen),
    index: false,
  },
  {
    id: 13,
    path: "/retirement/electronic-statement",
    element: createSuspense(ElectronicStatement),
    index: false,
  },
  {
    id: 14,
    path: "/retirement/electronic-statement",
    element: createSuspense(ElectronicStatement),
    index: false,
  },
  {
    id: 15,
    path: "/retirement/create-request",
    element: createSuspense(CreateRequestScreen),
    index: false,
  },
  {
    id: 16,
    path: "/retirement/fraction",
    element: createSuspense(FractionScreen),
    index: false,
  },
  {
    id: 17,
    path: "/retirement/report-creator",
    element: createSuspense(ReportGeneratorScreen),
    index: false,
  },
  {
    id: 18,
    path: "/retirement/base-info",
    element: createSuspense(BaseInfoScreen),
    index: false,
  },
  {
    id: 19,
    path: "/retirement/base-info2",
    element: createSuspense(BaseInfo2),
    index: false,
  },
  {
    id: 20,
    path: "/retirement/insert-announce",
    element: createSuspense(InsertAnnounce),
    index: false,
  },
  {
    id: 21,
    path: "/retirement/dashboard",
    element: createSuspense(DashboardScreen),
    index: false,
  },
  {
    id: 22,
    path: "/retirement/salary",
    element: createSuspense(SalaryScreen),
    index: false,
  },
];
