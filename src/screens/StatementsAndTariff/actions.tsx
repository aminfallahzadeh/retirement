// IMPORTS
import { Tooltip, IconButton } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { MRT_RowData } from "material-react-table";
import { PERSONNEL_URL } from "@/constants/urls";
import { OBSERVE } from "@/constants/const";

export const personnelActions = [
  {
    accessorKey: "observePersonnel",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }: MRT_RowData) => (
      <Tooltip
        title={`${row.original.personnelFirstName} ${row.original.personnelLastName}`}
      >
        <Link
          to={`${PERSONNEL_URL}?personID=${row.id}&personDeathDate=${row.original.personDeathDate}`}
        >
          <IconButton color="primary" sx={{ padding: "0" }}>
            <EyeIcon />
          </IconButton>
        </Link>
      </Tooltip>
    ),
  },
];
