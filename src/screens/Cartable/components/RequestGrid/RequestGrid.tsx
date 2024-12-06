// IMPORTS
import { useCallback, useEffect, useState } from "react";
import { Request, RequestTableData } from "./types";
import { useLazyGetRequestQuery } from "@/features/request/requestApi";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import { Grid } from "@/shared/components/Grid";
import { columnsRenderer } from "./columns";
import { topBarActionsProvider } from "./actions";

export const RequestGrid = () => {
  // STATES
  const [requestTableData, setRequestTableData] = useState<RequestTableData>(
    []
  );

  // CONSTS
  const { role } = useAppSelector((state) => state.role);
  const [
    getRequests,
    { isLoading: isRequestsLoading, isFetching: isRequestsFetching },
  ] = useLazyGetRequestQuery();

  const fetchRequests = useCallback(
    async (Role: string) => {
      try {
        const res = await getRequests({ Role }).unwrap();
        const mappedData = res?.itemList.map(
          (item: Request, index: number) => ({
            id: item.requestID,
            requestRowNum: index + 1,
            requestNO: item.requestNO || "-",
            requestTypeID: item.requestTypeID,
            personID: item.personID,
            requestTypeNameFa: item.requestTypeNameFa,
            personName: item.personFirstName + " " + item.personLastName || "-",
            date: item.requestDate,
            body: item.requestText,
          })
        );

        setRequestTableData(mappedData);
      } catch (error) {
        console.log(error);
      }
    },
    [getRequests]
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (role) {
      fetchRequests(role?.value);
    } else {
      setRequestTableData([]);
    }
  }, [role, fetchRequests]);

  // HANDLERS
  const handleRefresh = () => {
    if (role) {
      fetchRequests(role?.value);
    }
  };

  const topBarActions = topBarActionsProvider({
    isLoading: isRequestsLoading,
    isFetching: isRequestsFetching,
    handleRefresh,
  });

  const columns = columnsRenderer({
    role,
  });

  const content = (
    <Grid
      columns={columns}
      data={requestTableData}
      topBarActions={topBarActions}
      scroll={false}
      isLoading={isRequestsLoading}
      isFetching={isRequestsFetching}
    />
  );

  return content;
};
