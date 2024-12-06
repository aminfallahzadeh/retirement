// IMPORTS
import { apiSlice } from "@/features/api/apiSlice";
import { USER_END } from "../api/endpoints";
import { PermissionData } from "@/shared/types/domain/user";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroup: builder.query({
      query: () => ({
        url: `${USER_END}/GetGroup`,
      }),
    }),
    insertGroup: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/InsertGroup`,
        method: "POST",
        body: data,
      }),
    }),
    deleteGroup: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/DeleteGroup`,
        method: "POST",
        body: data,
      }),
    }),
    updateGroup: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/UpdateGroup`,
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: ({ userName, userID }) => {
        let url = `${USER_END}/GetUser`;

        const queryParams = [];

        if (userName) {
          queryParams.push(`userName=${userName}`);
        }

        if (userID) {
          queryParams.push(`userID=${userID}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/UpdateUser`,
        method: "POST",
        body: data,
      }),
    }),
    insertUser: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/InsertUser`,
        method: "POST",
        body: data,
      }),
    }),
    getUserGroups: builder.query({
      query: (userID) => ({
        url: `${USER_END}/GetGroupUser?userID=${userID}`,
      }),
    }),
    insertGroupUsers: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/InsertGroupUser`,
        method: "POST",
        body: data,
      }),
    }),
    getItems: builder.query({
      query: () => ({
        url: `${USER_END}/GetItem`,
      }),
    }),
    getGroupItems: builder.query({
      query: (groupID) => ({
        url: `${USER_END}/GetGroupItem?groupID=${groupID}`,
      }),
    }),
    insertGroupItem: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/InsertGroupItem`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserTheme: builder.mutation({
      query: (data) => ({
        url: `${USER_END}/UpdateUserTheme`,
        method: "POST",
        body: data,
      }),
    }),
    getItemAccess: builder.query<PermissionData, void>({
      query: () => ({
        url: `${USER_END}/GetItemAccess`,
      }),
    }),

    getUserTheme: builder.query({
      query: () => ({
        url: `${USER_END}/GetUserTheme`,
      }),
    }),
  }),
});

export const {
  useGetGroupQuery,
  useInsertGroupMutation,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useInsertUserMutation,
  useGetItemsQuery,
  useInsertGroupItemMutation,
  useGetGroupItemsQuery,
  useGetUserGroupsQuery,
  useInsertGroupUsersMutation,
  useUpdateUserThemeMutation,
  useGetItemAccessQuery,
  useGetUserThemeQuery,
} = usersApi;
