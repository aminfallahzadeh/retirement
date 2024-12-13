// IMPORTS
import { PayItem } from "../../types";
import { MRT_ColumnDef } from "material-react-table";
import { Tooltip, IconButton } from "@mui/material";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { separateByThousand } from "@/helpers/numberConverter";
import {
  ROW_NO,
  ITEM_ID,
  ITEM_NAME,
  AMOUNT,
  OBSERVE,
  DELETE,
} from "@/constants/const";

export const payItemsColumns = (
  observeFn: (id: string) => void,
  deleteFn: (id: string) => void
): MRT_ColumnDef<PayItem>[] => [
  {
    accessorKey: "financialItemRowNum",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "payItemTypeID",
    header: ITEM_ID,
    size: 20,
  },
  {
    accessorKey: "payItemTypeName",
    header: ITEM_NAME,
    size: 20,
  },
  {
    accessorKey: "payItemAmount",
    header: AMOUNT,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <span>{separateByThousand(renderedCellValue as number)}</span>
    ),
  },
  {
    accessorKey: "editPayItem",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title={`${OBSERVE} "${row.original.payItemTypeName}"`}>
        <IconButton
          color="primary"
          sx={{ padding: "0" }}
          onClick={() => observeFn(row.original.id)}
        >
          <EyeIcon />
        </IconButton>
      </Tooltip>
    ),
  },
  {
    accessorKey: "removePayItem",
    header: DELETE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title={`${DELETE} "${row.original.payItemTypeName}"`}>
        <IconButton
          color="error"
          sx={{ padding: "0" }}
          onClick={() => deleteFn(row.original.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ),
  },
];
