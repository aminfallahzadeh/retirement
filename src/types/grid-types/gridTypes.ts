// REACT TYPES
import { ReactNode } from "react";
import { MRT_RowData } from "material-react-table";

export type CellRendererProps = {
  renderedCellValue?: string;
  row?: MRT_RowData;
};

export type GridColumnProps = {
  accessorKey: string;
  header: string;
  size?: number;
  Cell?: (element: CellRendererProps) => ReactNode | undefined;
  enableSorting?: boolean;
  enableColumnActions?: boolean;
  muiTableBodyCellProps?: object;
};

export type UseCreateColumnsProps = {
  columnDefs: Array<GridColumnProps>;
  customCellRenderers?: {
    [key: string]: (element: CellRendererProps) => ReactNode | undefined;
  };
  dependencies: unknown[];
};
