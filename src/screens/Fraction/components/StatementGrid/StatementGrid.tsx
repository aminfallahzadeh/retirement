// IMPORTS
import { useState, useEffect, useCallback, memo } from "react";
import { Grid } from "@/shared/components/Grid";
import { fractionStatementColumns } from "./columns";
import { Statement } from "../../types";
import { useLazyGetPersonnelStatementQuery } from "@/features/personnel/personnelApi";

export const StatementGrid = memo(
  ({
    personID,
    handleRowSelect,
  }: {
    personID: string | null;
    handleRowSelect: (rowId: string | null) => void;
  }) => {
    // STATES
    const [tableData, setTableData] = useState<Statement[]>([]);

    // CONSTS
    const [getStatements, { isLoading, isFetching }] =
      useLazyGetPersonnelStatementQuery();
    const columns = fractionStatementColumns();

    // HANDLERS
    const fetchData = useCallback(async () => {
      const response = await getStatements({ personID }).unwrap();
      const mappedData = response.itemList.map(
        (item: Statement, index: number) => ({
          id: item.personnelStatementSerial,
          personnelStatementRowNo: index + 1,
          personnelStatementSerial: item.personnelStatementSerial,
          orderType: item.orderType,
          personnelStatementNumber: item.personnelStatementID,
          insertTime: item.insertTime,
          personnelStatementRunDate: item.personnelStatementRunDate,
        })
      );
      setTableData(mappedData);
    }, [getStatements, personID]);

    useEffect(() => {
      if (personID) {
        fetchData();
      } else {
        setTableData([]);
      }
    }, [personID, fetchData]);

    return (
      <Grid
        data={tableData}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        scroll={false}
        onRowSelect={handleRowSelect}
      />
    );
  }
);
