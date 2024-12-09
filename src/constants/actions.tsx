// IMPORTS
import { Tooltip, IconButton } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { MRT_RowData } from "material-react-table";
import { OBSERVE } from "./const";

export const personnelActions = [
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

export const personnelPayActions = (
  fn: (personID: string) => Promise<void>
) => [
  {
    accessorKey: "observeStaff",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }: MRT_RowData) => (
      <Tooltip title="مشاهده آیتمها">
        <IconButton
          color="primary"
          sx={{ padding: "0" }}
          onClick={() => fn(row.original.id)}
        >
          <EyeIcon />
        </IconButton>
      </Tooltip>
    ),
  },
];
