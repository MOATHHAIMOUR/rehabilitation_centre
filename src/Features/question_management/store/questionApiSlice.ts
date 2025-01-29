import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddNewQuestion } from "../interfaces";
import { IGenericApiResponse } from "../../../interfaces";

export const questionApiSlice = createApi({
  reducerPath: "questionApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/Question",
  }),
  endpoints: (builder) => ({
    addNewQuestion: builder.mutation<
      IGenericApiResponse<string>,
      IAddNewQuestion
    >({
      query: (newQuestion) => ({
        url: "/AddQuestion",
        method: "POST",
        body: newQuestion,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useAddNewQuestionMutation } = questionApiSlice;
