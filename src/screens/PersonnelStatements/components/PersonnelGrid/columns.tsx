// IMPORTS
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { VisibilityOutlined as EyeIcon } from "@mui/icons-material";
import { MRT_RowData } from "material-react-table";
import { PersonnelColumns } from "./types";
import {
  ROW_NO,
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  PERSONNEL_NO,
  OBSERVE,
} from "@/constants/const";

export const personnelColumns: PersonnelColumns = [
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
  {
    accessorKey: "observePersonnel",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }: MRT_RowData) => (
      <Tooltip
        title={`${row.original.personFirstName} ${row.original.personLastName}`}
      >
        <Link
          to={`/retirement/personnel-statements/info?personID=${row.id}&personDeathDate=${row.original.personDeathDate}`}
        >
          <IconButton color="primary" sx={{ padding: "0" }}>
            <EyeIcon />
          </IconButton>
        </Link>
      </Tooltip>
    ),
  },
];
