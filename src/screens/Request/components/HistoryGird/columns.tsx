// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { RequestHistory } from "../../types";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import {
  ROW_NO,
  USER,
  ROLE,
  DATE,
  EXPLANATION,
  STATE_LEVEL,
  STATUS,
} from "@/constants/const";

export const historyColumns = (): MRT_ColumnDef<RequestHistory>[] => [
  {
    accessorKey: "historyRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "historyUser",
    header: USER,
    size: 20,
  },
  {
    accessorKey: "historyRoleName",
    header: ROLE,
    size: 20,
  },
  {
    accessorKey: "historyDate",
    header: DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "historyDesc",
    header: EXPLANATION,
    size: 20,
  },
  {
    accessorKey: "historyStateName",
    header: STATE_LEVEL,
    size: 20,
  },
  {
    accessorKey: "historyCondition",
    header: STATUS,
    size: 20,
  },
];
