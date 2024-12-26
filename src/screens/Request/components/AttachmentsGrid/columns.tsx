// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { RequestAttachment } from "../../types";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import { Tooltip, IconButton } from "@mui/material";
import {
  ROW_NO,
  OBSERVE,
  DELETE,
  ATTACHMENT_NAME,
  DESCRIPTION,
} from "@/constants/const";

const options = {
  toolbar: {
    prev: false,
    next: false,
    play: false,
    stop: false,
  },

  title: (imageData: { naturalWidth: number; naturalHeight: number }) =>
    `(${imageData.naturalWidth} × ${imageData.naturalHeight})`,
};

export const attachmentsColumns = (
  deleteFn: (id: string) => void
): MRT_ColumnDef<RequestAttachment>[] => [
  {
    accessorKey: "attachmentsRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "attachmentTypeName",
    header: ATTACHMENT_NAME,
    size: 20,
  },
  {
    accessorKey: "attachmentsDesc",
    header: DESCRIPTION,
    size: 20,
  },
  {
    accessorKey: "deleteAttachment",
    header: DELETE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title={`${DELETE} "${row.original.attachmentTypeName}"`}>
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
  {
    accessorKey: "observeAttachment",
    header: OBSERVE,
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
    Cell: ({ row }) => (
      <Tooltip title={`${OBSERVE} "${row.original.attachmentTypeName}"`}>
        <span>
          {row.original.image ? (
            <RViewer options={options} imageUrls={row.original.image}>
              <RViewerTrigger>
                <IconButton sx={{ padding: "0" }} color="info">
                  <EyeIcon color="info" />
                </IconButton>
              </RViewerTrigger>
            </RViewer>
          ) : (
            <IconButton sx={{ padding: "0" }} color="info" disabled>
              <EyeIcon color="action" />
            </IconButton>
          )}
        </span>
      </Tooltip>
    ),
  },
];
