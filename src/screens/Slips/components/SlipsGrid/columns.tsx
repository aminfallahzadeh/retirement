// IMPORTS
import { Slip } from "../../types";
import { MRT_ColumnDef } from "material-react-table";
import { Tooltip, IconButton } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import { separateByThousand } from "@/helpers/numberConverter";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import {
  ROW_NO,
  FIRST_NAME,
  LAST_NAME,
  ACCOUNT_NO,
  PAY_AMOUNT,
  FRACTIONS,
  TOTAL_AMOUNT,
  DOWNLOAD,
  EDIT,
  PAY_DATE,
} from "@/constants/const";

export const slipsColumns = (
  observeFn: (id: string) => void,
  updateFn: (id: string) => void
): MRT_ColumnDef<Slip>[] => [
  {
    accessorKey: "slipRowNum",
    header: ROW_NO,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
  },
  {
    accessorKey: "slipFirstName",
    header: FIRST_NAME,
    size: 20,
  },
  {
    accessorKey: "slipLastName",
    header: LAST_NAME,
    size: 20,
  },
  {
    accessorKey: "slipAccountNo",
    header: ACCOUNT_NO,
    size: 20,
  },
  {
    accessorKey: "slipPayDebitAmount",
    header: PAY_AMOUNT,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{separateByThousand(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "slipPayCreditAmount",
    header: FRACTIONS,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{separateByThousand(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "slipPayAmount",
    header: TOTAL_AMOUNT,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{separateByThousand(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "slipPayDate",
    header: PAY_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "observeSlip",
    header: DOWNLOAD,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title="دانلود و مشاهده فیش">
        <IconButton
          color="primary"
          sx={{ padding: "0" }}
          onClick={() => {
            observeFn(row.original.id);
          }}
        >
          <EyeIcon />
        </IconButton>
      </Tooltip>
    ),
  },
  {
    accessorKey: "updateSlip",
    header: EDIT,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title="ویرایش فیش">
        <IconButton
          color="success"
          sx={{ padding: "0" }}
          onClick={() => updateFn(row.original.id)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    ),
  },
];
