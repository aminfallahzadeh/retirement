// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { BaseInfoOrganization } from "./types";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import {
  ROW_NO,
  IDENTIFIER,
  ORGANIZATION_NAME,
  ACTIVE,
  EDIT,
} from "@/constants/const";

export const baseInfoOrganizationColumns =
  (): MRT_ColumnDef<BaseInfoOrganization>[] => [
    {
      accessorKey: "organRow",
      header: ROW_NO,
      size: 20,
    },
    {
      accessorKey: "organID",
      header: IDENTIFIER,
      size: 20,
    },
    {
      accessorKey: "organName",
      header: ORGANIZATION_NAME,
      size: 20,
    },
    {
      accessorKey: "organIsActive",
      header: ACTIVE,
      size: 20,
    },
    {
      accessorKey: "editOrgan",
      header: EDIT,
      enableSorting: false,
      enableColumnActions: false,
      size: 20,
      Cell: () => (
        <IconButton color="success" sx={{ padding: "0" }}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];
