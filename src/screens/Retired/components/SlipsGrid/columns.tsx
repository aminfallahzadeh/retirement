// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { Slip } from "../../types";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { separateByThousand } from "@/helpers/numberConverter";
import { BASE_URL } from "@/constants/urls";
import {
  ROW_NO,
  CREDIT_AMOUNT,
  TOTAL_AMOUNT,
  PAY_DATE,
  PAY_YEAR,
  PAY_MONTH,
  OBSERVE,
  DEBIT_AMOUNT,
} from "@/constants/const";

export const slipsColumns = (
  personID: string | null
): MRT_ColumnDef<Slip>[] => [
  {
    accessorKey: "slipRowNo",
    header: ROW_NO,
    size: 20,
  },
  {
    accessorKey: "slipCreditAmount",
    header: CREDIT_AMOUNT,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{separateByThousand(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "slipDebitAmount",
    header: DEBIT_AMOUNT,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{separateByThousand(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "slipAmount",
    header: TOTAL_AMOUNT,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>
        {separateByThousand(renderedCellValue as string)}
        ریال
      </div>
    ),
  },
  {
    accessorKey: "slipDate",
    header: PAY_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "slipCurrentYear",
    header: PAY_YEAR,
    size: 20,
  },
  {
    accessorKey: "slipCurrentMonth",
    header: PAY_MONTH,
    size: 20,
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
          to={`${BASE_URL}document/rslip?personID=${personID}&payID=${row.original.id}`}
        >
          <EyeIcon color="primary" />
        </Link>
      </Tooltip>
    ),
  },
];
