// IMPORTS
import { memo } from "react";
import { Grid } from "@/shared/components/Grid";
import { ComparisonPayItem } from "../../types";
import { compareSalaryColumns } from "./columns";

export const CompareSalaryGrid = memo(
  ({
    data,
    isLoading,
    isFetching,
  }: {
    data: ComparisonPayItem[];
    isLoading: boolean;
    isFetching: boolean;
  }) => {
    return (
      <Grid
        data={data}
        columns={compareSalaryColumns}
        scroll={false}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    );
  }
);
