// IMPORTS
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPayListQuery } from "@/features/pay/payApi";
import { slipsColumns } from "./columns";
import { Grid } from "@/shared/components/Grid";
import { Slip } from "../../types";

const SlipsGrid = () => {
  // STATES
  const [tableData, setTableData] = useState<Slip[]>([]);
  const [searchParams] = useSearchParams();

  // CONSTS
  const personID = searchParams.get("personID");
  const {
    data: slips,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetPayListQuery({ personID, payType: "M" });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const data = slips.itemList.map((item: Slip, index: number) => ({
        id: item.payID,
        slipRowNo: index + 1,
        slipCreditAmount: item.payCreditAmount,
        slipDebitAmount: item.payDebitAmount,
        slipAmount: item.payAmount,
        slipDate: item.payDate,
        slipCurrentYear: item.currentYear,
        slipCurrentMonth: item.currentMonth,
      }));

      setTableData(data);
    }
  }, [isSuccess, slips]);

  const columns = slipsColumns(personID);

  // CONTENT
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

export default SlipsGrid;
