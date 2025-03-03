import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";
import {
  EnumAnswerType,
  EnumWhenToShowQuestion,
} from "../../features/question-management/enums";

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
  questionText: string;
  researchTypeId: number;
  researchCategoryId: number;
  parentQuestionId: number | null;
  answerTypeId: EnumAnswerType;
  isAnswerRequired: boolean;
  choices: string[] | null;
  debendQuestion: IAddNewQuestion | null;
  whenToShowQuestion: EnumWhenToShowQuestion | null;
}

// * Start Research Type View
export interface IResearchQuestionView {
  researchCategoryNameEn: string;
  researchCategoryNameAr: string;
  researchCategoryId: number;
  researchQuestions: IResearchQuestion[];
}

export interface IResearchQuestion {
  researchQuestionId: number;
  questionText: string;
  whenToShowQuestion: number | null;
  isAnswerRequired: boolean;
  answerTypeId: number;
  questionsChoices: IResearchQuestionChoice[];
}

export interface IResearchQuestionChoice {
  researchQuestionChoiceId: number;
  choiceName: string;
}
// * End Research Type View

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

    getResearchQuestionsByResearchTypeId: builder.query<
      IGenericApiResponse<IResearchQuestionView[]>,
      number
    >({
      query: (researchTypeId) => ({
        url: `/GetResearchQuestions?ResearchTypeId=${researchTypeId}`,
        method: "GET",
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
  useLazyGetResearchQuestionsByResearchTypeIdQuery,
  useGetQuestionByStageCategoryIdQuery,
} = questionApiSlice;
