// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { Statement } from "@/shared/types/statement";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { BASE_URL } from "@/constants/urls";
import {
  ROW_NO,
  STATEMENT_SERIAL,
  STATEMENT_NO,
  STATEMENT_TYPE,
  ISSUE_DATE,
  RUN_DATE,
  OBSERVE,
  DELETE,
  SERIAL,
  STATEMENT_CONFIRMED,
} from "@/constants/const";

export const statementsColumns = (
  deleteFn: (id: string) => void
): MRT_ColumnDef<Statement>[] => [
  {
    accessorKey: "retirementStatementRowNo",
    size: 20,
    header: ROW_NO,
    enableColumnActions: false,
    enableSorting: false,
  },
  {
    accessorKey: "retirementStatementNo",
    size: 20,
    header: STATEMENT_NO,
  },
  {
    accessorKey: "retirementStatementSerial",
    size: 20,
    header: STATEMENT_SERIAL,
  },
  {
    accessorKey: "retirementStatementTypeName",
    size: 20,
    header: STATEMENT_TYPE,
  },
  {
    accessorKey: "retirementStatementIssueDate",
    header: ISSUE_DATE,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "retirementStatementRunDate",
    header: RUN_DATE,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "observeRetirementStatement",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title={`${SERIAL} ${row.original.retirementStatementSerial}`}>
        <Link
          to={`${BASE_URL}document/rstatement?statementID=${row.original.id}&personID=${row.original.personID}&personDeathDate=${row.original.personDeathDate}`}
        >
          <EyeIcon color="primary" />
        </Link>
      </Tooltip>
    ),
  },
  {
    accessorKey: "deleteRetirementStatement",
    header: DELETE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip
        title={
          row.original.retirementStatementIssueConfirmDate
            ? STATEMENT_CONFIRMED
            : `${SERIAL} ${row.original.retirementStatementSerial}`
        }
      >
        <span>
          <IconButton
            disabled={
              row.original.retirementStatementIssueConfirmDate ? true : false
            }
            color="error"
            onClick={() => deleteFn(row.original.id)}
            sx={{ padding: "0" }}
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
    ),
  },
];
