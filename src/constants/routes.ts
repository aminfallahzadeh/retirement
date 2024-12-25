// IMPORTS
import { lazy, createElement } from "react";
import { createSuspense } from "@/utils/suspenseCreator";
import { AppRoute } from "@/shared/types/route";
import AppLayout from "@/layouts/AppLayout/AppLayout";
import {
  BASE_URL,
  CARTABLE_URL,
  RETIRED_URL,
  PERSONNEL_STATEMENTS_URL,
  PERSONNEL_URL,
  ELECTRONIC_STATEMENT_URL,
  CREATE_REQUEST_URL,
  FRACTION_URL,
  FRACTION_CALCULATE_URL,
  BASE_INF_2_URL,
  RELATED_URL,
  ANNOUNCE_URL,
  HEIR_URL,
  DOCUMENT_URL,
  GENERATE_STATEMENT_URL,
  RETIRED_STATEMENTS_TAB_URL,
  RETIRED_SLIPS_TAB_URL,
  RETIRED_REQUESTS_TAB_URL,
} from "./urls";

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
const StatementsAndTariff = lazy(
  () => import("@/screens/StatementsAndTariff/StatementsAndTariff")
);
const Personnel = lazy(() => import("@/screens/Personnel/Personnel"));
const ElectronicStatement = lazy(
  () => import("@/screens/ElectronicStatement/ElectronicStatement")
);
const CreateRequest = lazy(() =>
  import("@/screens/CreateRequest").then((m) => ({ default: m.CreateRequest }))
);
const ReportGeneratorScreen = lazy(
  () => import("@/screens/ReportGeneratorScreen")
);
const Announce = lazy(() => import("@/screens/Announce/Announce"));
const BaseInfoScreen = lazy(() => import("@/screens/BaseInfoScreen"));
const BaseInfo2 = lazy(() => import("@/screens/BaseInfo2/BaseInfo2"));
const DashboardScreen = lazy(() => import("@/screens/DashboardScreen"));
const SalaryScreen = lazy(() => import("@/screens/SalaryScreen"));
const Related = lazy(() => import("@/screens/Related/Related"));
const Heir = lazy(() => import("@/screens/Heir/Heir"));
const Fraction = lazy(() => import("@/screens/Fraction/Fraction"));
const CalculateFraction = lazy(
  () =>
    import("@/screens/Fraction/components/CalculateFraction/CalculateFraction")
);
const SubmitFraction = lazy(
  () => import("@/screens/Fraction/components/SubmitFraction/SubmitFraction")
);
const Document = lazy(() => import("@/screens/Document/Document"));
const GenerateStatement = lazy(
  () => import("@/screens/GenerateStatement/GenerateStatement")
);
const RelatedOrHeirTab = lazy(
  () => import("@/screens/Retired/components/RelatedOrHeirTab/RelatedOrHeirTab")
);
const RetiredStatementsGrid = lazy(
  () =>
    import("@/shared/components/RetiredStatementsGrid/RetiredStatementsGrid")
);
const RetiredSlipsGrid = lazy(() => import("@/grids/RetiredSlipsGrid"));
const AllRequestsGrid = lazy(() => import("@/grids/AllRequestsGrid"));

export const ROUTES: AppRoute[] = [
  {
    id: 1,
    path: BASE_URL,
    element: createSuspense(Auth),
    index: true,
  },
  {
    id: 2,
    element: createElement(AppLayout),
    children: [
      {
        id: 100,
        path: CARTABLE_URL,
        element: createSuspense(Cartable, [], true),
        index: false,
      },
      {
        id: 101,
        path: RETIRED_URL,
        element: createSuspense(Retired, ["requestID", "personID"], true),
        index: false,
        children: [
          {
            id: 222,
            path: "",
            element: createSuspense(RelatedOrHeirTab, [], true),
            index: true,
          },
          {
            id: 223,
            path: RETIRED_STATEMENTS_TAB_URL,
            element: createSuspense(RetiredStatementsGrid, [], true),
            index: false,
          },
          {
            id: 224,
            path: RETIRED_SLIPS_TAB_URL,
            element: createSuspense(RetiredSlipsGrid, [], true),
            index: false,
          },
          {
            id: 225,
            path: RETIRED_REQUESTS_TAB_URL,
            element: createSuspense(AllRequestsGrid, [], true),
            index: false,
          },
        ],
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
        path: PERSONNEL_STATEMENTS_URL,
        element: createSuspense(StatementsAndTariff, [], true),
        index: false,
      },
      {
        id: 110,
        path: PERSONNEL_URL,
        element: createSuspense(Personnel, ["personID"], true),
        index: false,
      },
      {
        id: 111,
        path: ELECTRONIC_STATEMENT_URL,
        element: createSuspense(ElectronicStatement, [], true),
        index: false,
      },
      {
        id: 113,
        path: CREATE_REQUEST_URL,
        element: createSuspense(CreateRequest, ["role"], true),
        index: false,
      },
      {
        id: 114,
        path: FRACTION_URL,
        element: createSuspense(Fraction, [], true),
        index: false,
        children: [
          {
            id: 214,
            path: "",
            element: createSuspense(SubmitFraction, [], true),
            index: true,
          },
          {
            id: 215,
            path: FRACTION_CALCULATE_URL,
            element: createSuspense(CalculateFraction, [], true),
            index: false,
          },
        ],
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
        path: BASE_INF_2_URL,
        element: createSuspense(BaseInfo2, [], true),
        index: false,
      },
      {
        id: 118,
        path: ANNOUNCE_URL,
        element: createSuspense(Announce, [], true),
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
      {
        id: 121,
        path: RELATED_URL,
        element: createSuspense(Related, ["id", "mode"], true),
        index: false,
      },
      {
        id: 122,
        path: HEIR_URL,
        element: createSuspense(Heir, ["id", "mode"], true),
        index: false,
      },
      {
        id: 123,
        path: DOCUMENT_URL,
        element: createSuspense(
          Document,
          ["statementID", "personID", "personDeathDate"],
          true
        ),
        index: false,
      },
      {
        id: 124,
        path: GENERATE_STATEMENT_URL,
        element: createSuspense(
          GenerateStatement,
          ["personID", "requestID"],
          true
        ),
        index: false,
      },
    ],
  },
];
