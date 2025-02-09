import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddNewQuestion } from "../../question_management/interfaces";
import { IGenericApiResponse } from "../../../interfaces";
import { IQuestion } from "../interfaces";

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

    getQuestionByStageCategoryId: builder.query<
      IGenericApiResponse<IQuestion[]>,
      number
    >({
      query: (stageCategoryId) => ({
        url: `/GetQuestionsByStageCategoryId?StageCategoryId=${stageCategoryId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddNewQuestionMutation,
  useGetQuestionByStageCategoryIdQuery,
} = questionApiSlice;
