// IMPORTS
import {
  REQUEST_ROW_NUM,
  REQUEST_NUMBER,
  REQUEST_TYPE_NAME,
  REQUEST_PERSON_NAME,
  REQUEST_DATE,
  REQUEST_SENDER_INFO,
  REQUEST_ACTION_OBSERVE,
} from "@/constants/const";

export const cartableGridSchema = [
  {
    accessorKey: REQUEST_ROW_NUM.key,
    header: REQUEST_ROW_NUM.header,
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: REQUEST_NUMBER.key,
    header: REQUEST_NUMBER.header,
    size: 20,
  },
  {
    accessorKey: REQUEST_TYPE_NAME.key,
    header: REQUEST_TYPE_NAME.header,
    size: 20,
  },
  {
    accessorKey: REQUEST_PERSON_NAME.key,
    header: REQUEST_PERSON_NAME.header,
    size: 20,
  },
  {
    accessorKey: REQUEST_DATE.key,
    header: REQUEST_DATE.header,
    size: 20,
  },
  {
    accessorKey: REQUEST_SENDER_INFO.key,
    header: REQUEST_SENDER_INFO.header,
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
  },
  {
    accessorKey: REQUEST_ACTION_OBSERVE.key,
    header: REQUEST_ACTION_OBSERVE.header,
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
  },
];
