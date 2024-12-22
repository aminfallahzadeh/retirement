// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { FRACTION_END } from "../api/endpoints";

export const fractionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFractionItemView: builder.query({
      query: ({ personID }) => ({
        url: `${FRACTION_END}/GetFractionItemView?personID=${personID}`,
      }),
    }),

    getFractionType: builder.query({
      query: () => ({
        url: `${FRACTION_END}/GetFractionType`,
      }),
    }),

    insertFractionExcel: builder.mutation({
      query: ({ data, type }) => {
        let url;

        switch (type) {
          case "728":
            url = `${FRACTION_END}/InsertFractionTakmili`;
            break;
          case "725":
            url = `${FRACTION_END}/InsertFractionMogharariMaheAval`;
            break;
          case "767":
            url = `${FRACTION_END}/InsertFractionSanavatMoavaghe`;
            break;
          case "723":
            url = `${FRACTION_END}/InsertFractionJari`;
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

    calculateFraction: builder.mutation({
      query: (data) => ({
        url: `${FRACTION_END}/CalculateFraction`,
        method: "POST",
        body: data,
      }),
    }),

    calculateFractionFromStatement: builder.mutation({
      query: (data) => ({
        url: `${FRACTION_END}/CalculateFractionFromPersonnelStatementOff`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetFractionItemViewQuery,
  useGetFractionTypeQuery,
  useInsertFractionExcelMutation,
  useCalculateFractionMutation,
  useCalculateFractionFromStatementMutation,
} = fractionApiSlice;
