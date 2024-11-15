// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { RELATED_END } from "../api/endpoints";

export const relatedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRelatedListByParentPersonID: builder.query({
      query: (parentPersonID) => ({
        url: `${RELATED_END}/GetRelatedListByParentPersonID?parentPersonID=${parentPersonID}`,
      }),
    }),
    getRelated: builder.query({
      query: (personID) => ({
        url: `${RELATED_END}/GetRelated?personID=${personID}`,
      }),
    }),
    insertRelated: builder.mutation({
      query: (data) => ({
        url: `${RELATED_END}/InsertRelated`,
        method: "POST",
        body: data,
      }),
    }),
    updateRelated: builder.mutation({
      query: (data) => ({
        url: `${RELATED_END}/UpdateRelated`,
        method: "POST",
        body: data,
      }),
    }),
    removeRelated: builder.mutation({
      query: ({ pensionaryID }) => ({
        url: `${RELATED_END}/RemoveRelated?pensionaryID=${pensionaryID}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetRelatedListByParentPersonIDQuery,
  useGetRelatedQuery,
  useInsertRelatedMutation,
  useUpdateRelatedMutation,
  useRemoveRelatedMutation,
} = relatedApiSlice;
