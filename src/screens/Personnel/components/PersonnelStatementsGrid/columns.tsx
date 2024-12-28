// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { PersonnelStatement } from "./types";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { BASE_URL } from "@/constants/urls";
import {
  ROW_NO,
  STATEMENT_SERIAL,
  STATEMENT_TYPE,
  STATEMENT_NO,
  ISSUE_DATE,
  RUN_DATE,
  OBSERVE,
} from "@/constants/const";

export const personnelStatementsColumns = (
  personID: string
): MRT_ColumnDef<PersonnelStatement>[] => [
  {
    accessorKey: "personnelStatementRowNo",
    header: ROW_NO,
    size: 20,
    enableColumnActions: false,
    enableSorting: false,
  },
  {
    accessorKey: "personnelStatementSerial",
    header: STATEMENT_SERIAL,
    size: 20,
  },
  {
    accessorKey: "personnelStatementType",
    header: STATEMENT_TYPE,
    size: 20,
  },
  {
    accessorKey: "personnelStatementNo",
    header: STATEMENT_NO,
    size: 20,
  },
  {
    accessorKey: "personnelStatementIssueDate",
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
  {
    accessorKey: "observeRetirementSlip",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title={OBSERVE}>
        <Link
          to={`${BASE_URL}document/pstatement?personID=${personID}&statementID=${row.original.id}`}
        >
          <EyeIcon color="primary" />
        </Link>
      </Tooltip>
    ),
  },
];
