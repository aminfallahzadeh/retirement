// IMPROTS
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/config/redux/base-query";

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
