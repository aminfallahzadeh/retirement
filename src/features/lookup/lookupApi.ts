// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { LOOKUP_END } from "../api/endpoints";
import { LookupDistinctData, LookUpData } from "@/shared/types/domain/lookup";

export const lookupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLookup: builder.query<
      LookUpData,
      { lookupType: string; lookupName?: string }
    >({
      query: ({ lookupType, lookupName }) => {
        let url = `${LOOKUP_END}/GetLookup?LookupType=${lookupType}`;
        if (lookupName) {
          url += `&lookUpName=${lookupName}`;
        }
        return {
          url,
        };
      },
    }),

    getLookupDistinct: builder.query<LookupDistinctData, void>({
      query: () => ({
        url: `${LOOKUP_END}/GetLookupDistinct`,
      }),
    }),

    insertLookup: builder.mutation({
      query: (data) => ({
        url: `${LOOKUP_END}/InsertLookup`,
        method: "POST",
        body: data,
      }),
    }),

    getLookupParent: builder.query({
      query: (type) => ({
        url: `${LOOKUP_END}/GetLookupParent?lookupType=${type}`,
      }),
    }),
  }),
});

export const {
  useLazyGetLookupQuery,
  useGetLookupDistinctQuery,
  useInsertLookupMutation,
  useLazyGetLookupParentQuery,
} = lookupApiSlice;
