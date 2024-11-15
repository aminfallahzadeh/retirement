// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { RETIRED_END } from "../api/endpoints";

export const retiredApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRetiredPerson: builder.query({
      query: (personID) => ({
        url: `${RETIRED_END}/GetRetiredPerson?personID=${personID}`,
      }),
    }),
    updateRetiredPerson: builder.mutation({
      query: (data) => ({
        url: `${RETIRED_END}/UpdateRetiredPerson`,
        method: "POST",
        body: data,
      }),
    }),
    getRetiredPensionary: builder.query({
      query: (personID) => ({
        url: `${RETIRED_END}/GetRetiredPensionary?personID=${personID}`,
      }),
    }),
    getRetiredAccount: builder.query({
      query: (personID) => ({
        url: `${RETIRED_END}/GetRetiredAccount?personID=${personID}`,
      }),
    }),
    updateRetiredPensionary: builder.mutation({
      query: (data) => ({
        url: `${RETIRED_END}/UpdateRetiredPensionary`,
        method: "POST",
        body: data,
      }),
    }),
    updateRetiredAccount: builder.mutation({
      query: (data) => ({
        url: `${RETIRED_END}/UpdateRetiredAccount`,
        method: "POST",
        body: data,
      }),
    }),
    getRetired: builder.query({
      query: (personID) => ({
        url: `${RETIRED_END}/GetRetired?personID=${personID}`,
      }),
    }),
    getAllPensionaries: builder.query({
      query: (personID) => ({
        url: `${RETIRED_END}/GetAllPensionaries?personID=${personID}`,
      }),
    }),
  }),
});

export const {
  useGetRetiredPersonQuery,
  useUpdateRetiredPersonMutation,
  useGetRetiredPensionaryQuery,
  useGetRetiredAccountQuery,
  useUpdateRetiredPensionaryMutation,
  useUpdateRetiredAccountMutation,
  useGetRetiredQuery,
  useLazyGetRetiredQuery,
  useGetAllPensionariesQuery,
} = retiredApiSlice;
