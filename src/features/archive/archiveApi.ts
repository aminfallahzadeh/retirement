// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { USER_END } from "../api/endpoints";

export const archiveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArchiveStructure: builder.query({
      query: (token) => ({
        url: `${USER_END}/GetArchiveStructure`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    insertArchiveStructure: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USER_END}/InsertArchiveStructure`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteArchiveStructure: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/DeleteArchiveStructure`,
        method: "POST",
        body: data,
      }),
    }),
    updateArchiveStructure: builder.mutation({
      query: ({ token, data }) => ({
        url: `${USER_END}/UpdateArchiveStructure`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    insertArchive: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/InsertArchive`,
        method: "POST",
        body: data,
      }),
    }),
    deleteArchive: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/DeleteArchive`,
        method: "POST",
        body: data,
      }),
    }),
    getArchive: builder.query({
      query: (personID) => ({
        url: `${USER_END}/GetArchive?personID=${personID}`,
      }),
    }),
  }),
});

export const {
  useGetArchiveStructureQuery,
  useInsertArchiveStructureMutation,
  useDeleteArchiveStructureMutation,
  useUpdateArchiveStructureMutation,
  useInsertArchiveMutation,
  useDeleteArchiveMutation,
  useGetArchiveQuery,
} = archiveApiSlice;
