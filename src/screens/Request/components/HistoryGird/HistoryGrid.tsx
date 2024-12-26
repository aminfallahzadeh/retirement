// IMPORTS
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetRequestHistoryQuery } from "@/features/request/requestApi";
import { Grid } from "@/shared/components/Grid";
import { historyColumns } from "./columns";
import { RequestHistory } from "../../types";

const HistoryGrid = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [tableData, setTableData] = useState<RequestHistory[]>([]);

  // CONSTS
  const requestID = searchParams.get("requestID");
  const { data, isLoading, isSuccess, isFetching } =
    useGetRequestHistoryQuery(requestID);

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data?.itemList?.map(
        (item: RequestHistory, index: number) => ({
          historyRowNo: index + 1,
          historyUser: item.firstName + " " + item.lastName || "-",
          historyRoleName: item.roleName || "-",
          historyDate: item.date || "-",
          historyDesc: item.description || "-",
          historyStateName: item.stateName || "-",
          historyCondition: item.accept || "-",
        })
      );

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  // CONTENT
  const columns = historyColumns();
  const content = (
    <Grid
      data={tableData}
      columns={columns}
      scroll={false}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );

  return content;
};

export default HistoryGrid;
