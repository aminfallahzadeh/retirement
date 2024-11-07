export const cartableGridSchema = [
  {
    accessorKey: "requestRowNum",
    header: "ردیف",
    size: 20,
    enableSorting: false,
    enableColumnActions: false,
  },
  {
    accessorKey: "requestNO",
    header: "شماره درخواست",
    size: 20,
  },
  {
    accessorKey: "requestTypeNameFa",
    header: "نوع درخواست",
    size: 20,
  },
  {
    accessorKey: "personName",
    header: "درخواست کننده",
    size: 20,
  },
  {
    accessorKey: "date",
    header: "تاریخ درخواست",
    size: 20,
  },
  {
    accessorKey: "senderInfo",
    header: "بررسی درخواست",
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
  },
  {
    accessorKey: "observe",
    header: "مشاهده درخواست",
    enableSorting: false,
    enableColumnActions: false,
    muiTableBodyCellProps: {
      align: "center",
    },
    size: 20,
  },
];
