// IMPORTS
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import CheckIcon from "@mui/icons-material/TextSnippetOutlined";
import { MRT_RowData } from "material-react-table";
import { RoleType } from "@/shared/types/role";
import { RequestColumn } from "./types";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import {
  ROW_NO,
  OBSERVE,
  REVIEW,
  REQUEST_NO,
  REQUEST_TYPE,
  REQUESTER,
  REQUEST_DATE,
} from "@/constants/const";

export const columnsRenderer = ({
  role,
}: {
  role: RoleType;
}): RequestColumn => [
  {
    accessorKey: "requestRowNum",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "requestNO",
    header: REQUEST_NO,
    size: 20,
  },
  {
    accessorKey: "requestTypeNameFa",
    header: REQUEST_TYPE,
    size: 20,
  },
  {
    accessorKey: "personName",
    header: REQUESTER,
    size: 20,
  },
  {
    accessorKey: "date",
    header: REQUEST_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "senderInfo",
    header: REVIEW,
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
    Cell: ({ row }: MRT_RowData) => (
      <Tooltip
        title={
          <>
            <span>{row.original.requestTypeNameFa}</span> <br />
            <span>{row.original.personName}</span>
          </>
        }
      >
        <Link
          to={
            row.original.requestTypeID ===
            "62A54585-F331-434A-9027-C9F3060F683A"
              ? `/retirement/group-slips?requestID=${row.original.id}`
              : row.original.requestTypeID ===
                "EC1E7E50-9815-442F-9CCB-27F47AB05199"
              ? `/retirement/group-slips?requestID=${row.original.id}&personID=${row.original.personID}`
              : row.original.requestTypeID ===
                "6E7BA26E-A1DC-4A5E-9700-17820A36158D"
              ? `/retirement/batch-statements?requestID=${row.original.id}`
              : `/retirement/retired?personID=${row.original.personID}&Role=${role?.value}&requestID=${row.original.id}`
          }
        >
          <span>
            <IconButton color="success" sx={{ padding: "0" }}>
              <CheckIcon color="success" />
            </IconButton>
          </span>
        </Link>
      </Tooltip>
    ),
  },
  {
    accessorKey: "observe",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
    Cell: ({ row }: MRT_RowData) => (
      <Tooltip title={row.original.requestNO}>
        <Link
          to={`/retirement/request?requestID=${row.id}&Role=${role?.value}&type=${row.original.requestTypeID}`}
        >
          <span>
            <IconButton sx={{ padding: "0" }} color="info">
              <EyeIcon color="info" />
            </IconButton>
          </span>
        </Link>
      </Tooltip>
    ),
  },
];
