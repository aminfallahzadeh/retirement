// IMPORTS
import { ReactNode } from "react";
import { PayItem } from "../../types";
import { Grid } from "@/shared/components/Grid";
import { MRT_ColumnDef } from "material-react-table";

export const PayItemsGrid = ({
  data,
  isLoading,
  isFetching,
  topBarActions,
  columns,
}: {
  data: PayItem[];
  isLoading: boolean;
  isFetching: boolean;
  topBarActions: ReactNode;
  columns: MRT_ColumnDef<PayItem>[];
}) => {
  const content = (
    <>
      <Grid
        columns={columns}
        data={data}
        isFetching={isFetching}
        topBarActions={topBarActions}
        isLoading={isLoading}
        scroll={false}
      />
    </>
  );

  return content;
};
