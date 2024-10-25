// REACT IMPORTS
import { useMemo } from "react";

// TYPES
import { UseCreateColumnsProps } from "@/types/GridTypes";

function useCreateColumns({
  columnDefs,
  customCellRenderers = {},
  dependencies = [],
}: UseCreateColumnsProps) {
  const columns = useMemo(() => {
    return columnDefs.map((col) => {
      // IF CUSOTOM CELL AVAILBALE APPLY OTHERWISE DEFAULT
      const customCell = customCellRenderers[col.accessorKey];

      return {
        ...col,
        Cell: customCell ?? undefined,
      };
    });
  }, [...dependencies]);

  return columns;
}

export default useCreateColumns;
