// IMPORTS
import {
  ROW_NO,
  NATIONAL_CODE,
  PERSONNEL_NO,
  FIRST_NAME,
  LAST_NAME,
  CURRENT_MONTH,
  PREVIOUS_MONTH,
  DIFF,
  STATUS,
} from "@/constants/const";

export const compareSalaryColumns = [
  {
    accessorKey: "compareRowNum",
    header: ROW_NO,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
  },
  {
    accessorKey: "payNationalCode",
    header: NATIONAL_CODE,
    size: 20,
  },
  {
    accessorKey: "payPersonID",
    header: PERSONNEL_NO,
    size: 20,
  },
  {
    accessorKey: "payFirstName",
    header: FIRST_NAME,
    size: 20,
  },
  {
    accessorKey: "payLastName",
    header: LAST_NAME,
    size: 20,
  },
  {
    accessorKey: "payCurrentMonth",
    header: CURRENT_MONTH,
    size: 20,
  },
  {
    accessorKey: "payLastMonth",
    header: PREVIOUS_MONTH,
    size: 20,
  },
  {
    accessorKey: "payDiff",
    header: DIFF,
    size: 20,
  },
  {
    accessorKey: "payStatus",
    header: STATUS,
    size: 20,
  },
];
