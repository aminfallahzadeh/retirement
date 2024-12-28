// IMPORTS
import { useState, ReactNode } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_RowSelectionState,
  MRT_ColumnDef,
  MRT_RowData,
  MRT_SortingState,
} from "material-react-table";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

export const Grid = <T extends MRT_RowData>({
  columns,
  data,
  topBarActions,
  bottomBarActions,
  sorting,
  scroll,
  highlightActive = false,
  props,
  isLoading,
  isFetching,
  onRowSelect,
}: {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  topBarActions?: ReactNode;
  bottomBarActions?: ReactNode;
  scroll: boolean;
  props?: object;
  sorting?: MRT_SortingState;
  isLoading?: boolean;
  isFetching?: boolean;
  highlightActive?: boolean;
  onRowSelect?: (selectedRowId: string | null) => void;
}) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const handleRowClick = (rowId: string) => {
    const newSelection = { [rowId]: true };
    setRowSelection(newSelection);
    if (onRowSelect) {
      const selectedRowId = Object.keys(newSelection)[0] || null;
      onRowSelect(selectedRowId);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    renderTopToolbarCustomActions: () => topBarActions,
    renderBottomToolbarCustomActions: () => bottomBarActions,
    muiLinearProgressProps: {
      color: "info",
      sx: {
        height: 2,
      },
    },
    muiCircularProgressProps: {
      color: "info",
    },
    muiTopToolbarProps: topBarActions
      ? {
          sx: {
            overflow: "none",
          },
        }
      : undefined,
    // muiTableHeadProps: topBarActions
    //   ? {
    //       sx: {
    //         zIndex: 0,
    //       },
    //     }
    //   : undefined,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row.id),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
        color: row.original.isActive && highlightActive ? "#087a30" : "",
        "& td": {
          color: row.original.isActive && highlightActive ? "#087a30" : "",
        },
      },
    }),
    localization: MRT_Localization_FA,
    enableFullScreenToggle: false,
    positionToolbarAlertBanner: "none",
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableDensityToggle: false,
    // enableFilterMatchHighlighting: false,
    muiTableBodyCellProps: {
      align: "center",
      sx: {
        fontFamily: "IranYekan",
        fontWeight: "300",
        borderRight: "1px solid #cfcfcf",
      },
    },
    muiTableHeadCellProps: {
      align: "center",
      sx: {
        borderRight: "1px solid #cfcfcf",
        fontFamily: "IranYekan",
        fontWeight: "600",
      },
    },
    initialState: {
      density: "compact",
      sorting: sorting ? sorting : [],
    },
    enablePagination: scroll ? false : true,
    enableBottomToolbar: scroll ? false : true,
    muiTableContainerProps: scroll ? { sx: { height: "300px" } } : undefined,
    paginationDisplayMode: "pages",
    muiPaginationProps: !scroll
      ? {
          size: "small",
          shape: "rounded",
          rowsPerPageOptions: [5, 10, 20],
          renderItem: (item) => (
            <PaginationItem
              {...item}
              slots={{
                previous: ChevronRight,
                next: ChevronLeft,
                first: LastPage,
                last: FirstPage,
              }}
            />
          ),
        }
      : undefined,
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection, isLoading: isLoading, showProgressBars: isFetching },
    ...props,
  });

  return <MaterialReactTable table={table} />;
};
