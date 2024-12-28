// IMPORTS
import { useEffect, useState } from "react";
import { Grid } from "@/shared/components/Grid";
import { useSearchParams } from "react-router-dom";
import { personnelFractionColumns } from "./columns";
import { PersonnelFraction } from "./types";
import { useGetFractionItemViewQuery } from "@/features/fraction/fractionApi";

export const PersonnelFractionGrid = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [tableData, setTableData] = useState<PersonnelFraction[]>([]);

  // CONSTS
  const personID = searchParams.get("personID");
  const { data, isSuccess, isLoading, isFetching } =
    useGetFractionItemViewQuery({ personID });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data?.itemList?.map(
        (item: PersonnelFraction, index: number) => ({
          fractionRowNo: index + 1,
          fractionYear: item.years || "-",
          fractionTypeName: item.fractiontypeName || "-",
          fractionChestName: item.chestName || "-",
          fractionOrganization: item.organizationName || "-",
          fractionFarvardin: item.fractionTotalAmount1 ?? "-",
          fractionOrganizationTotalAmount1:
            item.fractionOrganizationTotalAmount1 ?? "-",
          fractionPersonnelTotalAmount1:
            item.fractionPersonnelTotalAmount1 ?? "-",
          fractionOrdibehesht: item.fractionTotalAmount2 ?? "-",
          fractionOrganizationTotalAmount2:
            item.fractionOrganizationTotalAmount2 ?? "-",
          fractionPersonnelTotalAmount2:
            item.fractionPersonnelTotalAmount2 ?? "-",
          fractionKhordad: item.fractionTotalAmount3 ?? "-",
          fractionOrganizationTotalAmount3:
            item.fractionOrganizationTotalAmount3 ?? "-",
          fractionPersonnelTotalAmount3:
            item.fractionPersonnelTotalAmount3 ?? "-",
          fractionTir: item.fractionTotalAmount4 ?? "-",
          fractionOrganizationTotalAmount4:
            item.fractionOrganizationTotalAmount4,
          fractionPersonnelTotalAmount4: item.fractionPersonnelTotalAmount4,
          fractionMordad: item.fractionTotalAmount5 ?? "-",
          fractionOrganizationTotalAmount5:
            item.fractionOrganizationTotalAmount5 ?? "-",
          fractionPersonnelTotalAmount5:
            item.fractionPersonnelTotalAmount5 ?? "-",
          fractionShahrivar: item.fractionTotalAmount6 ?? "-",
          fractionOrganizationTotalAmount6:
            item.fractionOrganizationTotalAmount6 ?? "-",
          fractionPersonnelTotalAmount6:
            item.fractionPersonnelTotalAmount6 ?? "-",
          fractionMehr: item.fractionTotalAmount7 ?? "-",
          fractionOrganizationTotalAmount7:
            item.fractionOrganizationTotalAmount7 ?? "-",
          fractionPersonnelTotalAmount7:
            item.fractionPersonnelTotalAmount7 ?? "-",
          fractionAban: item.fractionTotalAmount8 ?? "-",
          fractionOrganizationTotalAmount8:
            item.fractionOrganizationTotalAmount8 ?? "-",
          fractionPersonnelTotalAmount8:
            item.fractionPersonnelTotalAmount8 ?? "-",
          fractionAzar: item.fractionTotalAmount9 ?? "-",
          fractionOrganizationTotalAmount9:
            item.fractionOrganizationTotalAmount9 ?? "-",
          fractionPersonnelTotalAmount9:
            item.fractionPersonnelTotalAmount9 ?? "-",
          fractionDey: item.fractionTotalAmount10 ?? "-",
          fractionOrganizationTotalAmount10:
            item.fractionOrganizationTotalAmount10 ?? "-",
          fractionPersonnelTotalAmount10:
            item.fractionPersonnelTotalAmount10 ?? "-",
          fractionBahman: item.fractionTotalAmount11 ?? "-",
          fractionOrganizationTotalAmount11:
            item.fractionOrganizationTotalAmount11 ?? "-",
          fractionPersonnelTotalAmount11:
            item.fractionPersonnelTotalAmount11 ?? "-",
          fractionEsfand: item.fractionTotalAmount12 ?? "-",
          fractionOrganizationTotalAmount12:
            item.fractionOrganizationTotalAmount12 ?? "-",
          fractionPersonnelTotalAmount12:
            item.fractionPersonnelTotalAmount12 ?? "-",
        })
      );

      setTableData(mappedData);
    }
  }, [isSuccess, data]);
  // CONTENT
  const columns = personnelFractionColumns();

  return (
    <Grid
      data={tableData}
      columns={columns}
      scroll={false}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};
