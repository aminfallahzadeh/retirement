// IMPORTS
import { PersonnelColumns } from "../../types";
import {
  ROW_NO,
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  PERSONNEL_NO,
} from "@/constants/const";

export const personnelColumns = (
  actions: PersonnelColumns = []
): PersonnelColumns => [
  {
    accessorKey: "personnelRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "personnelFirstName",
    header: FIRST_NAME,
    size: 20,
  },
  {
    accessorKey: "personnelLastName",
    header: LAST_NAME,
    size: 20,
  },
  {
    accessorKey: "personnelNationalCode",
    header: NATIONAL_CODE,
    size: 20,
  },
  {
    accessorKey: "personnelID",
    header: PERSONNEL_NO,
    size: 20,
  },
  ...actions,
];
