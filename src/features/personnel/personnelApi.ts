// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { PERSONNEL_END } from "../api/endpoints";

export const personnelStatementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonnelStatement: builder.query({
      query: ({ personID, PersonnelStatementID }) => {
        let url = `${PERSONNEL_END}/GetPersonnelStatement`;

        const queryParams = [];

        if (personID) {
          queryParams.push(`personID=${personID}`);
        }

        if (PersonnelStatementID) {
          queryParams.push(`PersonnelStatementID=${PersonnelStatementID}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
    }),
    getPersonnelStatementOff: builder.query({
      query: ({ personID }) => ({
        url: `${PERSONNEL_END}/GetPersonnelStatementOff?personID=${personID}`,
      }),
    }),

    getPersonnelStatementOffType: builder.query({
      query: () => ({
        url: `${PERSONNEL_END}/GetPersonnelStatementOffType`,
      }),
    }),

    getPersonnelStatementDetail: builder.query({
      query: ({ personnelStatementID }) => ({
        url: `${PERSONNEL_END}/GetPersonnelStatementDetail?PersonnelStatementID=${personnelStatementID}`,
      }),
    }),
  }),
});

export const {
  useGetPersonnelStatementQuery,
  useGetPersonnelStatementOffQuery,
  useGetPersonnelStatementOffTypeQuery,
  useGetPersonnelStatementDetailQuery,
} = personnelStatementApiSlice;
