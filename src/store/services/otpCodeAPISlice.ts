import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";

interface ISendOTPCode {
  phoneNumber: string;
}

interface IVerifyOTPCode {
  phoneNumber: string;
  otpCode: string;
}

export const otpCodeAPISlice = createApi({
  reducerPath: "otpCodeAPISlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/OTP/",
  }),
  endpoints: (builder) => ({
    sendOTP: builder.mutation<IGenericApiResponse<string>, ISendOTPCode>({
      query: (body) => ({
        url: "SendOTP",
        method: "POST",
        body,
      }),
    }),
    verifyOTP: builder.mutation<IGenericApiResponse<string>, IVerifyOTPCode>({
      query: (body) => ({
        url: "VerifyOTP",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendOTPMutation, useVerifyOTPMutation } = otpCodeAPISlice;
