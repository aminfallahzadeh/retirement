// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { REPORT_END } from "../api/endpoints";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboardReport: builder.query({
      query: ({
        startDate,
        finishDate,
        applicantTypeIsRetired,
        organizationID,
      }) => {
        let url = `${REPORT_END}/DashboardReport?startDate=${startDate}&finishDate=${finishDate}`;

        if (applicantTypeIsRetired) {
          url += `&applicantTypeIsRetired=${applicantTypeIsRetired}`;
        }

        if (organizationID) {
          url += `&organizationID=${organizationID}`;
        }

        return {
          url,
        };
      },
    }),

    getPayCompareReport: builder.query({
      // 1 = retired 0 = heir -1 = both
      query: ({
        CurrentYear,
        CurrentMonth,
        PayItemTypeID,
        pensionaryIsRetired,
      }) => ({
        url: `${REPORT_END}/GetPayCompareReport?CurrentYear=${CurrentYear}&CurrentMonth=${CurrentMonth}&PayItemTypeID=${PayItemTypeID}&pensionaryIsRetired=${pensionaryIsRetired}`,
      }),
    }),
  }),
});

export const { useLazyDashboardReportQuery, useLazyGetPayCompareReportQuery } =
  reportApiSlice;
