import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INewStageCategory, IStageCategory } from "../interfaces";
import { IGenericApiResponse } from "../../../interfaces";

export const stageCategoryApiSlice = createApi({
  reducerPath: "stageCategoryApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/StageCategory",
  }),
  endpoints: (builder) => ({
    addNewStageCategory: builder.mutation<
      IGenericApiResponse<string>,
      INewStageCategory
    >({
      query: (newStageCategory) => ({
        url: "/AddNewStageCategory",
        method: "POST",
        body: newStageCategory,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    GetAllStagesCategoryByStageId: builder.query<
      IGenericApiResponse<IStageCategory[]>,
      number
    >({
      query: (stageId) => ({
        url: `/Categories?StageId=${stageId}`,
        method: "GET",
      }),
    }),

    GetSubStagesCategoryByStageCategoryId: builder.query<
      IGenericApiResponse<IStageCategory[]>,
      number
    >({
      query: (stageId) => ({
        url: `/SubCategories?StageCategoryId=${stageId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddNewStageCategoryMutation,
  useLazyGetAllStagesCategoryByStageIdQuery,
  useLazyGetSubStagesCategoryByStageCategoryIdQuery,
} = stageCategoryApiSlice;
