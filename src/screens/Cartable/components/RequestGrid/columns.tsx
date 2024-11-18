// IMPROTS
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import {
  VisibilityOutlined as EyeIcon,
  TextSnippetOutlined as CheckIcon,
} from "@mui/icons-material";
import { MRT_RowData } from "material-react-table";
import { RoleType } from "@/shared/types/role";
import { RequestColumn } from "./types";

import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "@/helper";

export const columnsRenderer = ({
  selectedRole,
}: {
  selectedRole: RoleType;
}): RequestColumn => [
  {
    accessorKey: "requestRowNum",
    header: "ردیف",
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianNumber(renderedCellValue)}</div>
    ),
  },
  {
    accessorKey: "requestNO",
    header: "شماره درخواست",
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianNumber(renderedCellValue)}</div>
    ),
  },
  {
    accessorKey: "requestTypeNameFa",
    header: "نوع درخواست",
    size: 20,
  },
  {
    accessorKey: "personName",
    header: "درخواست کننده",
    size: 20,
  },
  {
    accessorKey: "date",
    header: "تاریخ درخواست",
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
    ),
  },
  {
    accessorKey: "senderInfo",
    header: "بررسی درخواست",
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
              : `/retirement/retired?personID=${row.original.personID}&Role=${selectedRole?.value}&requestID=${row.original.id}`
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
    header: "مشاهده درخواست",
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
    Cell: ({ row }: MRT_RowData) => (
      <Tooltip title={convertToPersianNumber(row.original.requestNO)}>
        <Link
          to={`/retirement-organization/request?requestID=${row.id}&Role=${selectedRole?.value}&type=${row.original.requestTypeID}`}
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
