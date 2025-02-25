import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";

export interface IStageCategory {
  stageCategoryId: number;
  nameAr: string;
  nameEn: string;
  stageId: number;
  parentStageId?: number;
  childCategories: IStageCategory[];
}

interface INewStageCategory {
  nameAr: string;
  parentStageCategoryId: number | null;
  stageId: number;
}

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
        url: `/GetStageCategoriesByStageId?StageId=${stageId}`,
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
  useGetAllStagesCategoryByStageIdQuery,
  useLazyGetSubStagesCategoryByStageCategoryIdQuery,
} = stageCategoryApiSlice;
