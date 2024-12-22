// IMPORTS
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { StatementColumn } from "../../types";
import {
  ROW_NO,
  STATEMENT_SERIAL,
  STATEMENT_NO,
  ISSUE_DATE,
  RUN_DATE,
  STATEMENT_TYPE,
} from "@/constants/const";

export const fractionStatementColumns = (): StatementColumn => [
  {
    accessorKey: "personnelStatementRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "personnelStatementSerial",
    header: STATEMENT_SERIAL,
    size: 20,
  },
  {
    accessorKey: "orderType",
    header: STATEMENT_TYPE,
    size: 20,
  },
  {
    accessorKey: "personnelStatementNumber",
    header: STATEMENT_NO,
    size: 20,
  },
  {
    accessorKey: "insertTime",
    header: ISSUE_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "personnelStatementRunDate",
    header: RUN_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
];
