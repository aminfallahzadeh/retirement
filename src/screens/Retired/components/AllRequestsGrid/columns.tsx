// IMPORTS
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { MRT_ColumnDef } from "material-react-table";
import { AllRequestType } from "../../types";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { REQUEST_URL } from "@/constants/urls";
import {
  ROW_NO,
  REQUEST_NO,
  REQUEST_TYPE,
  REQUEST_SENDER,
  REQUEST_DATE,
  OBSERVE,
} from "@/constants/const";

export const allRequestsColumns = (
  Role: string | null
): MRT_ColumnDef<AllRequestType>[] => [
  {
    accessorKey: "requestRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "requestNo",
    header: REQUEST_NO,
    size: 20,
  },
  {
    accessorKey: "requestTypeNameFa",
    header: REQUEST_TYPE,
    size: 20,
  },
  {
    accessorKey: "requestSenderName",
    header: REQUEST_SENDER,
    size: 20,
  },
  {
    accessorKey: "requestDate",
    header: REQUEST_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "observeReq",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title={row.original.requestNo}>
        <Link
          to={`${REQUEST_URL}?requestID=${row.id}&Role=${Role}&type=${row.original.requestType}`}
        >
          <EyeIcon color="primary" />
        </Link>
      </Tooltip>
    ),
  },
];
