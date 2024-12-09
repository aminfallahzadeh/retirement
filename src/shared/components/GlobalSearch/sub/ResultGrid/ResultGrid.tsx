// IMPORTS
import { memo } from "react";
import { Grid } from "@/shared/components/Grid";
import { personnelColumns } from "./columns";
import { PersonnelGridProps } from "../../types";
import { useActions } from "@/context/useActions";

export const ResultGrid = memo(
  ({ data, isLoading, isFetching }: PersonnelGridProps) => {
    const actions = useActions();
    const columns = personnelColumns(actions);
    return (
      <Grid
        columns={columns}
        scroll={false}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    );
  }
);
