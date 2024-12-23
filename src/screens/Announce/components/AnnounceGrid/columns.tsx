// IMPORTS
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { AnnounceColumn } from "./types";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import {
  ROW_NO,
  TITLE,
  ANNOUNCE_DESCRIPTION,
  DELETE,
  DATE,
} from "@/constants/const";

export const announceColumns = (
  deleteFn: (id: string) => void
): AnnounceColumn => [
  {
    accessorKey: "announceRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "announceTitle",
    header: TITLE,
    size: 20,
  },
  {
    accessorKey: "announceDesc",
    header: ANNOUNCE_DESCRIPTION,
    size: 20,
    Cell: ({ renderedCellValue, row }) => (
      <Tooltip title={<p>{row.original.description}</p>}>
        <p
          style={{
            width: "80ch",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {renderedCellValue}
        </p>
      </Tooltip>
    ),
    muiTableBodyCellProps: {
      align: "right",
    },
  },
  {
    accessorKey: "announceRunDate",
    header: DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "deleteAnnounce",
    header: DELETE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <IconButton
        color="error"
        onClick={() => deleteFn(row.original.id)}
        sx={{ padding: "0" }}
      >
        <DeleteIcon />
      </IconButton>
    ),
  },
];
