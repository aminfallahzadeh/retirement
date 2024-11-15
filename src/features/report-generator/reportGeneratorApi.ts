// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { REPORT_GENERATOR_END } from "../api/endpoints";

export const reportGeneratorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query({
      query: (role) => {
        let url = `${REPORT_GENERATOR_END}/GetTables`;

        if (role) {
          url += `?Role=${role}`;
        }
        // url: `${REPORT_GENERATOR_END}/GetTables?Role=${role}`,

        return {
          url,
        };
      },
    }),

    getCols: builder.query({
      query: (TableName) => ({
        url: `${REPORT_GENERATOR_END}/GetCols?TableName=${TableName}`,
      }),
    }),

    getLookupValue: builder.query({
      query: (id) => ({
        url: `${REPORT_GENERATOR_END}/GetLookupValue?id=${id}`,
      }),
    }),
    generateReport: builder.query({
      query: ({
        txtSelectPart,
        ConditionsCode,
        cmbGroupField0,
        cmbGroupField1,
        cmbGroupField2,
        cmbGroupField3,
        cmbGroupFunction0,
        cmbGroupFunction1,
        cmbGroupFunction2,
        cmbGroupFunction3,
        ForSave,
        ReportName,
      }) => {
        // Ensure default values
        cmbGroupField0 = cmbGroupField0 ?? "1000";
        cmbGroupFunction0 = cmbGroupFunction0 ?? "none";

        cmbGroupField1 = cmbGroupField1 ?? "1000";
        cmbGroupFunction1 = cmbGroupFunction1 ?? "none";

        cmbGroupField2 = cmbGroupField2 ?? "1000";
        cmbGroupFunction2 = cmbGroupFunction2 ?? "none";

        cmbGroupField3 = cmbGroupField3 ?? "1000";
        cmbGroupFunction3 = cmbGroupFunction3 ?? "none";

        const url = `${REPORT_GENERATOR_END}/GenerateReport?txtSelectPart=${txtSelectPart}&ConditionsCode=${ConditionsCode}&cmbGroupField0=${cmbGroupField0}&cmbGroupFunction0=${cmbGroupFunction0}&cmbGroupField1=${cmbGroupField1}&cmbGroupFunction1=${cmbGroupFunction1}&cmbGroupField2=${cmbGroupField2}&cmbGroupFunction2=${cmbGroupFunction2}&cmbGroupField3=${cmbGroupField3}&cmbGroupFunction3=${cmbGroupFunction3}&ForSave=${ForSave}&ReportName=${ReportName}`;

        return {
          url,
        };
      },
    }),
  }),
});

export const {
  useGetTablesQuery,
  useLazyGetColsQuery,
  useLazyGetLookupValueQuery,
  useLazyGenerateReportQuery,
} = reportGeneratorApiSlice;
