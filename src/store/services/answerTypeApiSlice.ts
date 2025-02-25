import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";

export interface IAnswerType {
  answerTypeId: number;
  type: string;
  notes: string;
}

export const answerTypeApiSlice = createApi({
  reducerPath: "answerTypeApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/AnswerType",
  }),
  endpoints: (builder) => ({
    getAllAnswerTypes: builder.query<IGenericApiResponse<IAnswerType[]>, void>({
      query: () => ({
        url: "/GetAllAnswerTypes",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAnswerTypesQuery } = answerTypeApiSlice;
