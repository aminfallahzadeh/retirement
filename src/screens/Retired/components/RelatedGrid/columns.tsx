// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { Related } from "../../types";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import { CREATE_RELATED_URL } from "@/constants/urls";
import { Link } from "react-router-dom";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import {
  ROW_NO,
  NATIONAL_CODE,
  FIRST_NAME,
  LAST_NAME,
  STATUS,
  BIRTH_DATE,
  RELATION,
  EDIT,
  DELETE,
} from "@/constants/const";

export const relatedColumns = (
  parentID: string | null,
  deleteFn: (id: string) => void
): MRT_ColumnDef<Related>[] => [
  {
    accessorKey: "relatedRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "personNationalCode",
    header: NATIONAL_CODE,
    size: 20,
  },
  {
    accessorKey: "personFirstName",
    header: FIRST_NAME,
    size: 20,
  },
  {
    accessorKey: "personLastName",
    header: LAST_NAME,
    size: 20,
  },
  {
    accessorKey: "pensionaryIsUnderGauranteeText",
    header: STATUS,
    size: 20,
  },
  {
    accessorKey: "personBirthDate",
    header: BIRTH_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "relationshipWithParentName",
    header: RELATION,
    size: 20,
  },
  {
    accessorKey: "updateRelated",
    header: EDIT,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip
        title={`${EDIT} "${row.original.personFirstName} ${row.original.personLastName}"`}
      >
        <Link
          to={`${CREATE_RELATED_URL}?mode=update&id=${parentID}&personID=${row.original.id}`}
        >
          <IconButton
            color="success"
            //   onClick={() => updateFn(row.original.id)}
            sx={{ padding: "0" }}
          >
            <EditIcon />
          </IconButton>
        </Link>
      </Tooltip>
    ),
  },
  {
    accessorKey: "deleteRelated",
    header: DELETE,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip
        title={`${DELETE} "${row.original.personFirstName} ${row.original.personLastName}"`}
      >
        <IconButton
          color="error"
          onClick={() => deleteFn(row.original.pensionaryID)}
          sx={{ padding: "0" }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ),
  },
];
