// REACT TYPES
import { ReactNode } from "react";

export type CellRendererProps = {
  renderedCellValue?: string;
};

export type GridColumnProps = {
  accessorKey: string;
  header: string;
  size?: number;
  Cell?: (element: CellRendererProps) => ReactNode;
  enableSorting?: boolean;
  enableColumnActions?: boolean;
  muiTableBodyCellProps?: object;
};

export type UseCreateColumnsProps = {
  columnDefs: GridColumnProps[];
  customCellRenderers?: Record<
    string,
    (element: CellRendererProps) => ReactNode
  >;
  dependencies: unknown[];
};
