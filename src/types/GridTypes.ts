// REACT TYPES
import { ReactNode } from "react";

export type GridColumnProps = {
  accessorKey: string;
  header: string;
  size?: number;
  Cell?: (element: any) => ReactNode | undefined;
  enableSorting?: boolean;
  enableColumnActions?: boolean;
  muiTableBodyCellProps?: object;
};

export type GridProps = {
  columns: GridColumnProps[];
  data: [];
  topBarActions?: ReactNode;
  bottomBarActions?: ReactNode;
  scroll: boolean;
  props?: any;
};

export type UseCreateColumnsProps = {
  columnDefs: Array<GridColumnProps>;
  customCellRenderers?: { [key: string]: (row: any) => ReactNode };
  dependencies: any[];
};
