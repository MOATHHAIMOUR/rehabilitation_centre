import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";

export interface ILoginRequest {
  nationalNo: string;
  password: string;
}

export interface IRegisterAccountRequest {
  nationalNo: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthenticationResponse {
  userId: number;
  authenticationMessage: string;
  name: string;
  jwtToken: string;
  refreshToken: string;
  refreshTokenExpirationAt: Date;
}

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7196/api/Auth/" }), // Adjust URL based on your API
  endpoints: (builder) => ({
    login: builder.mutation<
      IGenericApiResponse<IAuthenticationResponse>,
      ILoginRequest
    >({
      query: (credentials) => ({
        url: "Login",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<
      IGenericApiResponse<IAuthenticationResponse>,
      { token: string }
    >({
      query: (body) => ({
        url: "RefreshToken",
        method: "POST",
        body,
      }),
    }),
    registerAccount: builder.mutation<
      IGenericApiResponse<IAuthenticationResponse>,
      IRegisterAccountRequest
    >({
      query: (body) => ({
        url: "RefreshToken",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterAccountMutation,
} = authApiSlice;
