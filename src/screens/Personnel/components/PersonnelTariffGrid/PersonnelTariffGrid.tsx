// IMPORTS
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPersonnelStatementOffQuery } from "@/features/personnel/personnelApi";
import { Grid } from "@/shared/components/Grid";
import { personnelTariffColumns } from "./columns";
import { PersonnelTariff } from "./types";

export const PersonnelTariffGrid = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [tableData, setTableData] = useState<PersonnelTariff[]>([]);

  // CONSTS
  const personID = searchParams.get("personID");
  const { data, isSuccess, isLoading, isFetching } =
    useGetPersonnelStatementOffQuery({ personID });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data.itemList.map(
        (item: PersonnelTariff, index: number) => ({
          tariffRowNo: index + 1,
          tariffEmployeeType: item.personnelStatementOffTypeName || "-",
          tariffYear: item.personnelStatementOffYear || "-",
          tariffMonth: item.personnelStatementOffMonth || "-",
          tariffDay: item.personnelStatementOffDay || "-",
          tariffReactTotal: "-",
          tariffTotal: "-",
        })
      );

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  // CONTENT
  const columns = personnelTariffColumns();
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
