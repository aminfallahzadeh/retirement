// IMPORTS
import { memo } from "react";
import { Grid } from "@/shared/components/Grid";
import { personnelColumns } from "./columns";
import { PersonnelGridProps } from "./types";

export const PersonnelGrid = memo(
  ({ data, isLoading, isFetching }: PersonnelGridProps) => {
    return (
      <Grid
        columns={personnelColumns}
        scroll={false}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    );
  }
);
