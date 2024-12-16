// IMPORTS
import { OBSERVE } from "@/constants/const";
import { Tooltip, IconButton } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { MRT_RowData } from "material-react-table";

export const searchActions = (fn: (personID: string) => Promise<void>) => [
  {
    accessorKey: "observeStaff",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }: MRT_RowData) => (
      <Tooltip title={OBSERVE}>
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
