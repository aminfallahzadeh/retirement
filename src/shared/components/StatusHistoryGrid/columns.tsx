// IMPORTS
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { ROW_NO, STATUS, START_DATE } from "@/constants/const";
import { StatusHistory } from "@/shared/types/status";
import { MRT_ColumnDef } from "material-react-table";

export const statusHistoryColumns = (): MRT_ColumnDef<StatusHistory>[] => [
  {
    accessorKey: "pensionaryStatusRowNum",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "pensionaryStatusName",
    header: STATUS,
    size: 20,
  },
  {
    accessorKey: "pensionaryStartdate",
    header: START_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: STATUS,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{renderedCellValue === true ? "فعال" : "غیرفعال"}</div>
    ),
  },
];
