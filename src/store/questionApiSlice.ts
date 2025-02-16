import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../interfaces";
import {
  EnumAnswerType,
  EnumWhenToShowQuestion,
} from "../features/question-management/enums";

export interface QuestionChoice {
  questionChoiceId: number;
  choiceName: string;
}

export interface IQuestion {
  questionId: number;
  nameAr: string;
  parentQuestionId: number;
  answerTypeId: EnumAnswerType;
  whenToShowQuestion: EnumWhenToShowQuestion;
  questionsChoices: QuestionChoice[];
}

export interface IAddNewQuestion {
  nameAr: string;
  stageId: number;
  stageCategoryId: number;
  parentQuestionId: number | null;
  answerTypeId: EnumAnswerType;
  choices: string[] | null;
  debendQuestion: IAddNewQuestion | null;
  whenToShowQuestion: EnumWhenToShowQuestion | null;
}

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
