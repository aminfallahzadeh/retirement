// IMPORTS
import { Grid } from "../Grid";
import { statusHistoryColumns } from "./columns";
import { StatusHistory } from "@/shared/types/status";

export const StatusHistoryGrid = ({
  data,
  isLoading,
  isFetching,
}: {
  data: StatusHistory[];
  isLoading: boolean;
  isFetching: boolean;
}) => {
  // CONSTS
  const columns = statusHistoryColumns();

  return (
    <Grid
      data={data}
      columns={columns}
      scroll={false}
      isLoading={isLoading}
      isFetching={isFetching}
      sorting={[{ id: "isActive", desc: true }]}
      highlightActive={true}
    />
  );
};
