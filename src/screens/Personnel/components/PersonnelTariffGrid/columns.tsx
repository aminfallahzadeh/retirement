// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { PersonnelTariff } from "./types";
import {
  ROW_NO,
  YEAR,
  EMPLOYEE_TYPE,
  MONTH,
  DAY,
  REAL_TOTAL,
  TOTAL,
} from "@/constants/const";

export const personnelTariffColumns = (): MRT_ColumnDef<PersonnelTariff>[] => [
  {
    accessorKey: "tariffRowNo",
    header: ROW_NO,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
  },
  {
    accessorKey: "tariffEmployeeType",
    header: EMPLOYEE_TYPE,
    size: 20,
  },
  {
    accessorKey: "tariffYear",
    header: YEAR,
    size: 20,
  },
  {
    accessorKey: "tariffMonth",
    header: MONTH,
    size: 20,
  },
  {
    accessorKey: "tariffDay",
    header: DAY,
    size: 20,
  },
  {
    accessorKey: "tariffReactTotal",
    header: REAL_TOTAL,
    size: 20,
  },
  {
    accessorKey: "tariffTotal",
    header: TOTAL,
    size: 20,
  },
];
