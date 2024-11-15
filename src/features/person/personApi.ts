// constant imports
import { apiSlice } from "../api/apiSlice";
import { PERSON_END } from "../api/endpoints";

// slice imports

export const personApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersons: builder.query({
      query: ({
        personID,
        personFirstName,
        personLastName,
        personNationalCode,
        personnelID,
      }) => {
        let url = `${PERSON_END}/GetPersons`;

        const queryParams = [];

        if (personID) {
          queryParams.push(`personID=${personID}`);
        }

        if (personnelID) {
          queryParams.push(`personnelID=${personnelID}`);
        }

        if (personFirstName) {
          queryParams.push(`personFirstName=${personFirstName}`);
        }
        if (personLastName) {
          queryParams.push(`personLastName=${personLastName}`);
        }
        if (personNationalCode) {
          queryParams.push(`personNationalCode=${personNationalCode}`);
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        return {
          url,
        };
      },
    }),
    insertPerson: builder.mutation({
      query: ({ token, data }) => ({
        url: `${PERSON_END}/InsertPerson`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updatePerson: builder.mutation({
      query: ({ token, data }) => ({
        url: `${PERSON_END}/UpdatePerson`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removePerson: builder.mutation({
      query: ({ token, id }) => ({
        url: `${PERSON_END}/RemovePerson?id=${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLazyGetPersonsQuery,
  useGetPersonsQuery,
  useInsertPersonMutation,
  useUpdatePersonMutation,
  useRemovePersonMutation,
} = personApiSlice;
