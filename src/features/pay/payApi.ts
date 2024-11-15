// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { PAY_END } from "../api/endpoints";

export const payApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    existPaySlip: builder.query({
      query: ({ payType, currentYear, currentMonth }) => ({
        url: `${PAY_END}/ExistPaySlip?payType=${payType}&currentYear=${currentYear}&currentMonth=${currentMonth}`,
      }),
    }),
    getPayList: builder.query({
      query: ({ personID, currentYear, currentMonth, payType }) => {
        let url = `${PAY_END}/GetPayList?payType=${payType}`;

        if (personID) {
          url += `&personID=${personID}`;
        }
        if (currentYear) {
          url += `&currentYear=${currentYear}`;
        }
        if (currentMonth) {
          url += `&currentMonth=${currentMonth}`;
        }

        return {
          url,
        };
      },
    }),

    getPay: builder.query({
      query: ({ payID }) => ({
        url: `${PAY_END}/GetPay?payID=${payID}`,
      }),
    }),

    issuePay: builder.mutation({
      query: ({ currentYear, currentMonth, requestID, payDate }) => ({
        url: `${PAY_END}/IssuePayForMunicipality?currentYear=${currentYear}&currentMonth=${currentMonth}&requestID=${requestID}&payDate=${payDate}`,
        method: "POST",
      }),
    }),

    insertPay: builder.mutation({
      query: ({ payDate, currentYear, currentMonth, requestID, personID }) => ({
        url: `${PAY_END}/InsertSinglePayForMunicipality?payDate=${payDate}&currentYear=${currentYear}&currentMonth=${currentMonth}&requestID=${requestID}&personID=${personID}`,
        method: "POST",
      }),
    }),

    removePayItem: builder.mutation({
      query: ({ payItemID }) => ({
        url: `${PAY_END}/RemovePayItem?payItemID=${payItemID}`,
        method: "POST",
      }),
    }),

    insertPayItem: builder.mutation({
      query: (data) => ({
        url: `${PAY_END}/InsertPayItem`,
        method: "POST",
        body: data,
      }),
    }),

    insertPayExcel: builder.mutation({
      query: ({ data, type }) => {
        let url;

        switch (type) {
          case "C":
            url = `${PAY_END}/GetFinancialItemListFromExcel`;
            break;
          case "E":
            url = `${PAY_END}/GetFicheListFromExcel`;
            break;

          default:
            throw new Error(`Unsupported type: ${type}`);
        }

        return {
          url,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
  useGetPayListQuery,
  useGetPayQuery,
  useIssuePayMutation,
  useInsertPayMutation,
  useRemovePayItemMutation,
  useInsertPayItemMutation,
  useInsertPayExcelMutation,
} = payApiSlice;
