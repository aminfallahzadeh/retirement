// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { STATEMENT_END } from "../api/endpoints";

export const retirementStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListOfRetirementStatements: builder.query({
      query: ({ personID, requestID }) => {
        let url = `${STATEMENT_END}/GetListOfRetirementStatements`;

        if (personID) {
          url += `?personID=${personID}`;
        }
        if (requestID) {
          url += `&requestID=${requestID}`;
        }

        return {
          url,
        };
      },
    }),
    generateNewRetirementStatement: builder.mutation({
      query: (data) => ({
        url: `${STATEMENT_END}/GenerateNewRetirementStatement`,
        method: "POST",
        body: data,
      }),
    }),
    removeRetirementStatement: builder.mutation({
      query: ({ rsID, requestID }) => {
        let url = `${STATEMENT_END}/RemoveRetirementStatement`;

        if (rsID) {
          url += `?rsID=${rsID}`;
        }
        if (requestID) {
          url += `&requestID=${requestID}`;
        }
        return {
          method: "POST",
          url,
        };
      },
    }),
    getRetirementStatement: builder.query({
      query: ({ RetirementStatementID }) => ({
        url: `${STATEMENT_END}/GetRetirementStatement?RetirementStatementID=${RetirementStatementID}`,
      }),
    }),

    getStatementListFromFilters: builder.mutation({
      query: (data) => ({
        url: `${STATEMENT_END}/GetStatementListFromFilters`,
        method: "POST",
        body: data,
      }),
    }),

    getStatementListFromExcel: builder.mutation({
      query: (data) => ({
        url: `${STATEMENT_END}/GetStatementListFromExcel`,
        method: "POST",
        body: data,
      }),
    }),

    getListOfRetirementStatementItem: builder.query({
      query: () => ({
        url: `${STATEMENT_END}/GetListOfRetirementStatementItem`,
      }),
    }),
    getListOfFormulaGroupSetting: builder.query({
      query: ({ retirementStatementItemID }) => {
        let url = `${STATEMENT_END}/GetListOfFormulaGroupSetting`;
        const queryParams = [];

        if (retirementStatementItemID) {
          queryParams.push(
            `retirementStatementItemID=${retirementStatementItemID}`
          );
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
    }),

    updateRetirementStatementFormulaGroupSetting: builder.mutation({
      // VIEW MODEL
      // {
      // "retirementStatementFormulaGroupSettingID": "string",
      // "retirementStatementItemID": "string",
      // "description": "string",
      // "value": 0
      // }

      query: (data) => ({
        url: `${STATEMENT_END}/UpdateRetirementStatementFormulaGroupSetting`,
        method: "POST",
        body: data,
      }),
    }),

    generateGroupStatement: builder.mutation({
      query: ({
        runDate,
        retirementStatementTypeID,
        retirementStatementDesc,
        insertUserID,
        requestID,
      }) => ({
        url: `${STATEMENT_END}/GenerateGroupStatement?runDate=${runDate}&retirementStatementTypeID=${retirementStatementTypeID}&retirementStatementDesc=${retirementStatementDesc}&insertUserID=${insertUserID}&requestID=${requestID}`,
        method: "POST",
      }),
    }),

    confirmRetirementStatement: builder.mutation({
      query: ({ retirementStatementID, requestID, confirmDate }) => {
        let url = `${STATEMENT_END}/ConfirmRetirementStatement?confirmDate=${confirmDate}`;
        if (retirementStatementID) {
          url += `&retirementStatementID=${retirementStatementID}`;
        }

        if (requestID) {
          url += `&requestID=${requestID}`;
        }
        return {
          url,
          method: "POST",
        };
      },
    }),

    updateRetirementStatementAmount: builder.mutation({
      query: ({ retirementStatementID, data }) => ({
        url: `${STATEMENT_END}/UpdateRetirementStatementAmount?retirementStatementID=${retirementStatementID}`,
        method: "POST",
        body: data,
      }),
    }),

    getRecommendRunDate: builder.query({
      query: (personID) => ({
        url: `${STATEMENT_END}/RecommendRunDate?PersonID=${personID}`,
      }),
    }),
  }),
});

export const {
  useGetListOfRetirementStatementsQuery,
  useGenerateNewRetirementStatementMutation,
  useRemoveRetirementStatementMutation,
  useGetRetirementStatementQuery,
  useLazyGetRetirementStatementQuery,
  useGetStatementListFromFiltersMutation,
  useGetStatementListFromExcelMutation,
  useGetListOfRetirementStatementItemQuery,
  useLazyGetListOfFormulaGroupSettingQuery,
  useUpdateRetirementStatementFormulaGroupSettingMutation,
  useGenerateGroupStatementMutation,
  useConfirmRetirementStatementMutation,
  useUpdateRetirementStatementAmountMutation,
  useGetRecommendRunDateQuery,
} = retirementStatementApiSlice;
