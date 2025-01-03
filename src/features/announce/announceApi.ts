// IMPORTS
import { apiSlice } from "@/features/api/apiSlice";
import { ANNOUNCE_END } from "../api/endpoints";

export const announceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnounce: builder.query({
      query: () => ({
        url: `${ANNOUNCE_END}/GetAnnounce`,
      }),
    }),

    insertAnnounce: builder.mutation({
      query: (data) => ({
        url: `${ANNOUNCE_END}/InsertAnnounce`,
        method: "POST",
        body: data,
      }),
    }),

    deleteAnnounce: builder.mutation({
      query: (data) => ({
        url: `${ANNOUNCE_END}/DeleteAnnounce`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAnnounceQuery,
  useInsertAnnounceMutation,
  useDeleteAnnounceMutation,
} = announceApiSlice;
