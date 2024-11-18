// IMPORTS
import { useState, ReactNode } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_RowSelectionState,
  MRT_ColumnDef,
  MRT_RowData,
} from "material-react-table";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import { convertToPersianNumber } from "@/helper.js";

export const Grid = <T extends MRT_RowData>({
  columns,
  data,
  topBarActions,
  bottomBarActions,
  scroll,
  props,
}: {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  topBarActions?: ReactNode;
  bottomBarActions?: ReactNode;
  scroll: boolean;
  props?: object;
}) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const table = useMaterialReactTable({
    columns,
    data,
    renderTopToolbarCustomActions: () => topBarActions,
    renderBottomToolbarCustomActions: () => bottomBarActions,
    muiTopToolbarProps: topBarActions
      ? {
          sx: {
            overflow: "none",
          },
        }
      : undefined,
    muiTableHeadProps: topBarActions
      ? {
          sx: {
            zIndex: 0,
          },
        }
      : undefined,
    muiTableBodyRowProps: ({ row }) => ({
      // IMPLEMENT ROW SELECTION MANUALLY
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    localization: MRT_Localization_FA,
    paginationDisplayMode: "pages",
    enableFullScreenToggle: false,
    positionToolbarAlertBanner: "none",
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableDensityToggle: false,
    enableFilterMatchHighlighting: false,
    muiTableBodyCellProps: {
      align: "center",
      sx: {
        fontFamily: "IranYekan",
        borderRight: "1px solid #cfcfcf",
      },
    },
    muiTableHeadCellProps: {
      align: "center",
      sx: {
        borderRight: "1px solid #cfcfcf",
        fontFamily: "Vazir",
        fontWeight: "600",
      },
    },
    initialState: {
      density: "compact",
    },
    enablePagination: scroll ? false : true,
    enableBottomToolbar: scroll ? false : true,
    muiTableContainerProps: scroll ? { sx: { height: "300px" } } : undefined,
    muiPaginationProps: !scroll
      ? {
          size: "small",
          shape: "rounded",
          showRowsPerPage: false,
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
        }
      : undefined,
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    ...props,
  });

  return <MaterialReactTable table={table} />;
};
