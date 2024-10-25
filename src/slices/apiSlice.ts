// REDUX
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setNewCredentials, logout } from "./authSlice";
import { Mutex } from "async-mutex";

// TYPES
import { RefreshResultType } from "@/types/tokenDataTypes";

// CONSTANTS
import { BASE_URL, USERS_URL_HTTPS } from "@/constants/urls";

const mutex = new Mutex();
let isRefreshingToken = false;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "same-origin",
  prepareHeaders: (headers, { getState, endpoint }) => {
    // const token = getState().auth.token;
    const state = getState() as { auth: { token: string | null } };
    const token = state.auth.token;
    if (token && !isRefreshingToken && endpoint !== "login") {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

// HADNLE AUTO REFRESH TOKEN
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === "FETCH_ERROR") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("sending refresh token");
        const state = api.getState() as RootState;
        const refreshToken = state.auth.refreshToken;
        const expiredate = state.auth.expiredate;
        isRefreshingToken = true;

        const refreshResult = (await baseQuery(
          {
            url: `${USERS_URL_HTTPS}/RefreshToken`,
            method: "POST",
            body: {
              token: "<string>",
              refreshToken,
              error: "<string>",
              expiredate,
            },
          },
          api,
          extraOptions
        )) as { data: RefreshResultType };
        isRefreshingToken = false;
        if (refreshResult.data) {
          api.dispatch(setNewCredentials({ ...refreshResult.data }));
          result = await baseQuery(
            typeof args === "string"
              ? {
                  url: args,
                  headers: {
                    Authorization: `Bearer ${refreshResult.data.itemList[0].token}`,
                  },
                }
              : {
                  ...args,
                  headers: {
                    ...args.headers,
                    Authorization: `Bearer ${refreshResult.data.itemList[0].token}`,
                  },
                },
            api,
            extraOptions
          );
          // result = await baseQuery(
          //   {
          //     ...args,
          //     headers: {
          //       "Authorization": `Bearer ${refreshResult.data.itemList[0].token}`,
          //     },
          //   },
          //   api,
          //   extraOptions
          // );
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// parent slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
