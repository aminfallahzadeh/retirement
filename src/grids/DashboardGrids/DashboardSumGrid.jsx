// react imports
import { useMemo } from "react";

// mui imports
import { MRT_Table, useMaterialReactTable } from "material-react-table";

// utils imports
import { defaultTableOptions } from "@/config/mrt";

// helpers
import { convertToPersianNumber } from "@/helper";

export const DashboardSumGrid = ({ data, retiredType }) => {
  const columns = useMemo(() => {
    let baseColumns;

    if (retiredType === "true") {
      baseColumns = [
        {
          accessorKey: "AliveRetireds",
          header: "کل",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "AliveRetiredsMen",
          header: "مرد",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "AliveRetiredsWomen",
          header: "زن",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
      ];
    } else if (retiredType === "false") {
      baseColumns = [
        {
          accessorKey: "DeadRetireds",
          header: "کل",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "DeadMenRetireds",
          header: "مرد",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "DeadWomenRetireds",
          header: "زن",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
      ];
    } else {
      baseColumns = [
        {
          accessorKey: "AllRetireds",
          header: "کل",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "AllMenRetireds",
          header: "مرد",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
        {
          accessorKey: "AllWomenRetireds",
          header: "زن",
          Cell: ({ renderedCellValue }) => (
            <span>{convertToPersianNumber(renderedCellValue)}</span>
          ),
        },
      ];
    }
    return baseColumns;
  }, [retiredType]);

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      align: "center",
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        caption: {
          captionSide: "top",
          textAlign: "center",
          fontFamily: "IranYekan",
          fontSize: "16px",
        },
      },
    },
    muiTableHeadCellProps: {
      align: "center",
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        fontWeight: "normal",
        fontFamily: "IranYekan",
      },
    },
    muiTableBodyCellProps: {
      align: "center",
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    renderCaption: () => "مجموع",
  });

  return <MRT_Table table={table} />;
};

export default DashboardSumGrid;
