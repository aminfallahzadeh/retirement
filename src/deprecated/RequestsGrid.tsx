// REACT IMPORTS
import { useEffect, useState } from "react";

// REDUX
import { useGetRequestQuery } from "@/slices/requestApiSlice";

// COMPONENTS
import Grid from "@/components/Grid";

// TYPES
import { RequestType } from "@/types/RequestTypes";

// LIBRARIES
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// HOOKS
import useCreateColumns from "@/hooks/useCreateColumns";
import useErrorHandling from "@/hooks/useHandleError";
import { useAppSelector } from "@/hooks/usePreTypesHooks";

// SCHEMAS
import { requestSchema as columnDefs } from "@/schemas/requestSchema.js";

// DATA
import { requestCellRenderer } from "@/data/grid-cells/requestCellRenderer";
import { requestGridActionsRenderer } from "@/data/grid-actions/requestGridActions";

function RequestsGrid({ isLoading, roles }) {
  const [requestTableData, setRequestTableData] = useState([] as any);

  const { selectedRole } = useAppSelector((state) => state.roleData);

  const customCellRenderers = requestCellRenderer(selectedRole);

  const {
    data: requests,
    isSuccess,
    isLoading: isRequestsLoading,
    isFetching: isRequestsFetching,
    error,
    refetch,
  } = useGetRequestQuery({ Role: selectedRole?.value });

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = requests.itemList.map(
        (item: RequestType, index: number) => ({
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

      setRequestTableData(data);
    }
  }, [requests, isSuccess, refetch, selectedRole]);

  useErrorHandling(error);

  const topBarActions = requestGridActionsRenderer({
    isLoading: isRequestsLoading,
    isFetching: isRequestsFetching,
    roles,
    handleRefresh,
  });

  const columns = useCreateColumns({
    columnDefs,
    customCellRenderers,
    dependencies: [selectedRole?.value],
  });

  const content = (
    <>
      {isRequestsLoading || isRequestsFetching || isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={5}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <Grid
          columns={columns}
          data={requestTableData}
          topBarActions={topBarActions}
          scroll={false}
        />
      )}
    </>
  );

  return content;
}

export default RequestsGrid;
