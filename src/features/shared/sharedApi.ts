// IMPORTS
import { apiSlice } from "../api/apiSlice";
import { SHARED_END } from "../api/endpoints";

export const sharedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLookupData: builder.query({
      query: ({ lookUpType, lookUpID, lookUpParentID }) => {
        let url = `${SHARED_END}/GetLookupData?lookUpType=${lookUpType}`;

        if (lookUpID) {
          url += `&lookUpID=${lookUpID}`;
        }

        if (lookUpParentID) {
          url += `&lookUpParentID=${lookUpParentID}`;
        }
        return {
          url,
        };
      },
    }),
    getRelationship: builder.query({
      query: () => ({
        url: `${SHARED_END}/GetRelationship`,
      }),
    }),
    getPensionaryStatus: builder.query({
      query: ({ pensionaryStatusCategory, pensionaryStatusIsDead }) => {
        let url = `${SHARED_END}/GetPensionaryStatus`;

        const queryParams = [];

        if (pensionaryStatusCategory) {
          queryParams.push(
            `pensionaryStatusCategory=${pensionaryStatusCategory}`
          );
        }

        if (
          pensionaryStatusIsDead !== undefined &&
          pensionaryStatusIsDead !== null
        ) {
          queryParams.push(`pensionaryStatusIsDead=${pensionaryStatusIsDead}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
    }),

    getRetirementStatementType: builder.query({
      query: ({ RetirementStatementTypeID }) => {
        let url = `${SHARED_END}/GetRetirementStatementType`;

        if (RetirementStatementTypeID) {
          url += `?RetirementStatementTypeID=${RetirementStatementTypeID}`;
        }

        return {
          url,
        };
      },
    }),

    getRetiredOrganization: builder.query({
      query: ({ organizationID }) => {
        let url = `${SHARED_END}/GetRetiredOrganization`;
        if (organizationID) {
          url += `?organizationID=${organizationID}`;
        }
        return {
          url,
        };
      },
    }),

    getPayItemType: builder.query({
      query: (payItemtypeID) => {
        let url = `${SHARED_END}/GetPayItemType`;
        if (payItemtypeID) {
          url += `?payItemtypeID=${payItemtypeID}`;
        }
        return {
          url,
        };
      },
    }),
  }),
});

export const {
  useGetLookupDataQuery,
  useLazyGetLookupDataQuery,
  useGetRelationshipQuery,
  useGetPensionaryStatusQuery,
  useGetRetirementStatementTypeQuery,
  useLazyGetRetirementStatementTypeQuery,
  useGetRetiredOrganizationQuery,
  useGetPayItemTypeQuery,
  useLazyGetPayItemTypeQuery,
} = sharedApiSlice;
