// IMPORTS
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPersonnelStatementQuery } from "@/features/personnel/personnelApi";
import { Grid } from "@/shared/components/Grid";
import { personnelStatementsColumns } from "./columns";
import { PersonnelStatement } from "./types";

const PersonnelStatementsGrid = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [tableData, setTableData] = useState<PersonnelStatement[]>([]);

  // CONSTS
  const personID = searchParams.get("personID");
  const { data, isSuccess, isLoading, isFetching } =
    useGetPersonnelStatementQuery({ personID });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data?.itemList?.map(
        (item: PersonnelStatement, index: number) => ({
          id: item.personnelStatementID,
          personnelStatementRowNo: index + 1,
          personnelStatementSerial: item.personnelStatementSerial,
          personnelStatementType: item.personnelStatementTypeName,
          personnelStatementNo: item.personnelStatementID,
          personnelStatementIssueDate: item.insertTime,
          personnelStatementRunDate: item.personnelStatementRunDate,
        })
      );

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  // CONTENT
  const columns = personnelStatementsColumns(personID as string);

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

export default PersonnelStatementsGrid;
