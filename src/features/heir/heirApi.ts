// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { HEIR_END } from "../api/endpoints";

export const heirApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeirListByParentPersonID: builder.query({
      query: (parentPersonID) => ({
        url: `${HEIR_END}/GetHeirListByParentPersonID?parentPersonID=${parentPersonID}`,
      }),
    }),
    getHeir: builder.query({
      query: (personID) => ({
        url: `${HEIR_END}/GetHeir?personID=${personID}`,
      }),
    }),
    insertHeir: builder.mutation({
      query: (data) => ({
        url: `${HEIR_END}/InsertHeir`,
        method: "POST",
        body: data,
      }),
    }),
    updateHeir: builder.mutation({
      query: (data) => ({
        url: `${HEIR_END}/UpdateHeir`,
        method: "POST",
        body: data,
      }),
    }),
    updateHeirAccount: builder.mutation({
      query: ({ token, data }) => ({
        url: `${HEIR_END}/UpdateHeirAccount`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeHeir: builder.mutation({
      query: ({ pensionaryID }) => ({
        url: `${HEIR_END}/RemoveHeir?pensionaryID=${pensionaryID}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetHeirListByParentPersonIDQuery,
  useLazyGetHeirListByParentPersonIDQuery,
  useGetHeirQuery,
  useRemoveHeirMutation,
  useUpdateHeirMutation,
  useInsertHeirMutation,
} = heirApiSlice;
