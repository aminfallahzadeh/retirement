// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { USER_END } from "../api/endpoints";
import { ArchiveStructureData } from "@/shared/types/archive";

export const archiveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArchiveStructure: builder.query<ArchiveStructureData, void>({
      query: () => ({
        url: `${USER_END}/GetArchiveStructure`,
      }),
    }),
    insertArchiveStructure: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/InsertArchiveStructure`,
        method: "POST",
        body: data,
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
      query: (data) => ({
        url: `${USER_END}/UpdateArchiveStructure`,
        method: "POST",
        body: data,
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
