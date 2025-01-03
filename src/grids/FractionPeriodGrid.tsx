// react imports
import { useMemo, useState, useEffect, useCallback } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { removePeriodRecord } from "../slices/fractionDataSlice.js";

// mui imports
import { IconButton, Tooltip, PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import CreatePeriodForm from "@/forms/CreatePeriodForm.jsx";

// library imports
import "react-loading-skeleton/dist/skeleton.css";

// helper imports
import { convertToPersianNumber } from "@/helper";

// utils imports
import { defaultTableOptions } from "@/config/mrt";

function FractionPeriodGrid() {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([]);

  const { periodsTableData } = useSelector((state) => state.fractionData);

  const dispatch = useDispatch();

  const removePeriodHandler = useCallback(
    (id) => {
      dispatch(removePeriodRecord(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const mappedData = periodsTableData.map((item, index) => ({
      id: item.id,
      periodRowNum: index + 1,
      periodYear: item.periodYear || "-",
      periodMonth: item.periodMonth || "-",
      periodDay: item.periodDay || "-",
    }));

    setData(mappedData);
  }, [periodsTableData]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "periodRowNum",
        header: "ردیف",
        size: 20,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "periodYear",
        header: "سال",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "periodMonth",
        header: "ماه",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "periodDay",
        header: "روز",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "deletePeriod",
        header: "حذف",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title="حذف دوره">
            <IconButton
              color="error"
              sx={{ padding: "0" }}
              onClick={() => removePeriodHandler(row.original.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [removePeriodHandler]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: data,
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    muiPaginationProps: {
      shape: "rounded",
      showRowsPerPage: false,
      size: "small",
      renderItem: (item) => (
        <PaginationItem
          {...item}
          page={convertToPersianNumber(item.page)}
          slots={{
            previous: ChevronRight,
            next: ChevronLeft,
            first: LastPage,
            last: FirstPage,
          }}
        />
      ),
    },
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const content = (
    <>
      <CreatePeriodForm />

      <MaterialReactTable table={table} />
    </>
  );

  return content;
}

export default FractionPeriodGrid;
