// IMPORTS
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetRequestQuery } from "@/features/request/requestApi";
import { Grid } from "@/shared/components/Grid";
import { AllRequestType } from "../../types";
import { allRequestsColumns } from "./columns";

const AllRequestsGrid = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [tableData, setTableData] = useState<AllRequestType[]>([]);

  // CONSTS
  const Role = searchParams.get("Role");
  const personID = searchParams.get("personID");
  const { data, isSuccess, isLoading, isFetching } = useGetRequestQuery({
    Role,
    personID,
  });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data?.itemList?.map(
        (item: AllRequestType, index: number) => ({
          id: item.requestID,
          requestRowNo: index + 1,
          requestType: item.requestTypeID,
          requestNo: item.requestNO || "-",
          personID: item.personID,
          requestTypeNameFa: item.requestTypeNameFa || "-",
          requestSenderName:
            item.personFirstName + " " + item.personLastName || "-",
          requestDate: item.requestDate || "-",
        })
      );

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  // CONTENT
  const columns = allRequestsColumns(Role);

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

export default AllRequestsGrid;
