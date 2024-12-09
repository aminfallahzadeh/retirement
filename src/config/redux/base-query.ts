// IMPORTS
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setNewCredentials, logout } from "@/features/auth/authSlice";
import { Mutex } from "async-mutex";
import { RefreshResultType } from "@/shared/types/tokenDataTypes";
import { USER_END } from "@/features/api/endpoints";
import { toastConfig } from "@/config/toast/toast-config";

const mutex = new Mutex();
let isRefreshingToken = false;

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { getState } = api;
  const state = getState() as RootState;
  const baseUrl = state.config.apiBaseUrl;

  const dynamicBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "omit",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState() as { auth: { token: string | null } };
      const token = state.auth.token;
      if (token && !isRefreshingToken && endpoint !== "login") {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  });

  return dynamicBaseQuery(args, api, extraOptions);
};

// HANDLE AUTO REFRESH TOKEN
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  //   console.log("ERROR RESULT", result);

  if (
    (result.error && result.error.status === "FETCH_ERROR") ||
    (result.error && result.error.status === 401)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log("sending refresh token");
        const state = api.getState() as RootState;
        const refreshToken = state.auth.refreshToken;
        isRefreshingToken = true;

        const refreshResult = (await baseQuery(
          {
            url: `${USER_END}/RefreshToken`,
            method: "POST",
            body: {
              refreshToken,
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

  if (result.error) {
    // console.log("ERROR RESULT:", result.error);
    const errorMessage =
      (result?.error?.data &&
        (result.error.data as { title?: string }).title) ||
      (result?.error?.data as { message?: string })?.message ||
      result?.error?.status ||
      "خطایی رخ داده است";
    toastConfig.error(`${errorMessage}`);
  }

  return result;
};
