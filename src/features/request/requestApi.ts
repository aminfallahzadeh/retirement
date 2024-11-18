// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { REQUEST_END } from "../api/endpoints";
import { RoleDataType } from "@/shared/types/role";

export const requestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query<RoleDataType, void>({
      query: () => ({
        url: `${REQUEST_END}/GetRole`,
      }),
    }),
    getExpert: builder.query({
      query: ({ RequestID, conditionValue, Role }) => ({
        url: `${REQUEST_END}/GetExpert?Requestid=${RequestID}&conditionValue=${conditionValue}&Role=${Role}`,
      }),
    }),
    getRequest: builder.query({
      query: ({
        Role,
        personID,
        requestID,
        RequestDateFrom,
        RequestDateTo,
      }) => {
        let url = `${REQUEST_END}/GetRequest?Role=${Role}`;

        if (personID) {
          url += `&personID=${personID}`;
        }
        if (requestID) {
          url += `&requestID=${requestID}`;
        }
        if (RequestDateFrom) {
          url += `&RequestDateFrom=${RequestDateFrom}`;
        }
        if (RequestDateTo) {
          url += `&RequestDateTo=${RequestDateTo}`;
        }

        return {
          url,
        };
      },
    }),
    insertRequest: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_END}/InsertRequest`,
        method: "POST",
        body: data,
      }),
    }),
    insertRequestByNationalCode: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_END}/InsertRequestByNationalCode`,
        method: "POST",
        body: data,
      }),
    }),
    sendRequestToNextState: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_END}/SendRequestToNextState`,
        method: "POST",
        body: data,
      }),
    }),
    getRequestType: builder.query({
      query: (role) => ({
        url: `${REQUEST_END}/GetRequestType?role=${role}`,
      }),
    }),

    getRequestHistory: builder.query({
      query: (requestID) => ({
        url: `${REQUEST_END}/GetRequestHistory?requestID=${requestID}`,
      }),
    }),

    getRequestAttachment: builder.query({
      query: (requestID) => ({
        url: `${REQUEST_END}/GetRequestAttachment?requestID=${requestID}`,
      }),
    }),

    insertRequestAttachment: builder.mutation({
      query: (data) => ({
        url: `${REQUEST_END}/InsertRequestAttachment`,
        method: "POST",
        body: data,
      }),
    }),
    getRequestTypeAttachment: builder.query({
      query: (requestTypeID) => ({
        url: `${REQUEST_END}/GetRequestTypeAttachment?requestTypeID=${requestTypeID}`,
      }),
    }),

    deleteRequestAttachment: builder.mutation({
      // VIEW MODEL
      /*
        {
          "requestAttachmentID": "string",
          "requestID": "string",
          "attachementTypeID": "string",
          "attachementDesc": "string",
          "attachment": "string",
          "contentType": "string",
          "insertUserID": "string",
          "insertTime": "2024-07-31T18:32:23.781Z",
          "updateUserID": "string",
          "updateTime": "2024-07-31T18:32:23.781Z"
        }     
      */
      query: (id) => ({
        url: `${REQUEST_END}/DeleteRequestAttachment?RequestAttachmentID=${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetRoleQuery,
  useLazyGetRoleQuery,
  useGetExpertQuery,
  useGetRequestQuery,
  useLazyGetRequestQuery,
  useGetRequestTypeQuery,
  useInsertRequestMutation,
  useSendRequestToNextStateMutation,
  useGetRequestHistoryQuery,
  useGetRequestAttachmentQuery,
  useInsertRequestAttachmentMutation,
  useGetRequestTypeAttachmentQuery,
  useDeleteRequestAttachmentMutation,
  useInsertRequestByNationalCodeMutation,
  useLazyGetRequestTypeQuery,
} = requestApi;
