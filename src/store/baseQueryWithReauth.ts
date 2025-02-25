import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/Auth/store/AuthSlice";
import { RootState } from "../store"; // Adjust the import based on your project structure
import { getCookie } from "../utils";
import { IGenericApiResponse } from "../interfaces";
import { IAuthenticationResponse } from "./services/authApiAlice";

export const baseQueryWithReauth = (
  baseUrl: string
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const store = getState() as RootState;
      const token = store.authSlice.authData.jwtToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  });

  return async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: Record<string, unknown> // or a specific interface
  ) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      const refreshToken = getCookie("refreshToken");
      // Try to refresh the token
      const refreshResult = (await baseQuery(
        {
          url: "http://localhost:5121/Auth/RefreshToken",
          method: "POST",
          body: { token: refreshToken },
        },
        api,
        extraOptions
      )) as {
        data?: IGenericApiResponse<IAuthenticationResponse>;
        error?: FetchBaseQueryError;
      };

      if (refreshResult?.data) {
        api.dispatch(setCredentials(refreshResult.data.data));

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Log out if refresh fails
        api.dispatch(logout());
      }
    }

    return result;
  };
};
