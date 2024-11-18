// REACT TYPES
import { MRT_ColumnDef } from "material-react-table";
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

export type UseCreateColumnsProps<T> = {
  schema: MRT_ColumnDef<T[]>[];
  customCellRenderers?: any;
  dependencies: unknown[];
};
