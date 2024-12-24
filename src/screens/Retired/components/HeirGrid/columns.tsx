// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { Link } from "react-router-dom";
import { Heir } from "../../types";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { HEIR_URL } from "@/constants/urls";
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
  CASE_NO,
} from "@/constants/const";

export const heirColumns = (
  parentID: string | null,
  deleteFn: (id: string) => void
): MRT_ColumnDef<Heir>[] => [
  {
    accessorKey: "heirRowNo",
    header: ROW_NO,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "heirNationalCode",
    header: NATIONAL_CODE,
    size: 20,
  },
  {
    accessorKey: "heirFirstName",
    header: FIRST_NAME,
    size: 20,
  },
  {
    accessorKey: "heirLastName",
    header: LAST_NAME,
    size: 20,
  },
  {
    accessorKey: "heirPensionaryIsUnderGauranteeText",
    header: STATUS,
    size: 20,
  },
  {
    accessorKey: "heirBirthDate",
    header: BIRTH_DATE,
    size: 20,
    Cell: ({ renderedCellValue }) => (
      <div>{convertToPersianDateFormatted(renderedCellValue as string)}</div>
    ),
  },
  {
    accessorKey: "heirRelationshipWithParentName",
    header: RELATION,
    size: 20,
  },
  {
    accessorKey: "heirParentPersonNationalCode",
    header: CASE_NO,
    size: 20,
  },
  {
    accessorKey: "updateHeir",
    header: EDIT,
    enableSorting: false,
    enableColumnActions: false,
    size: 20,
    Cell: ({ row }) => (
      <Tooltip
        title={`${EDIT} "${row.original.personFirstName} ${row.original.personLastName}"`}
      >
        <Link
          to={`${HEIR_URL}?mode=update&id=${parentID}&personID=${row.original.id}`}
        >
          <EditIcon color="success" />
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
