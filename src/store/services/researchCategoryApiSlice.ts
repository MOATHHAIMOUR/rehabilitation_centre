import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";

export interface IResearchCategory {
  researchCategoryId: number;
  researchTypeId: number;
  nameAr: string;
  nameEn: string;
  parentStageId?: number;
  childrenResearchCategories: IResearchCategory[];
}

export interface INewResearchCategory {
  nameAr: string;
  nameEn: string;
  parentResearchCategoryId: number | null;
  researchTypeId: number;
}

export interface IResultNewResearchCategory {
  researchCategoryID: number;
  nameAr: string;
  nameEn: string;
  parentResearchCategoryId: number | null;
  researchTypeId: number;
}

export const researchCategoryApiSlice = createApi({
  reducerPath: "researchCategoryApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/ResearchCategory",
  }),
  tagTypes: ["ResearchCategory"],
  endpoints: (builder) => ({
    addNewResearchCategory: builder.mutation<
      IGenericApiResponse<IResultNewResearchCategory>,
      INewResearchCategory
    >({
      query: (newResearchCategory) => ({
        url: "/AddNewResearchCategory",
        method: "POST",
        body: newResearchCategory,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "ResearchCategory", id: "List" }],
    }),

    GetAllResearchCategoriesByResearchTypeId: builder.query<
      IGenericApiResponse<IResearchCategory[]>,
      number
    >({
      query: (stageId) => ({
        url: `/GetAllResearchCategoriesByResearchTypeId?ResearchTypeId=${stageId}`,
        method: "GET",
      }),
      providesTags: [{ type: "ResearchCategory", id: "List" }],
    }),

    GetAllChildrenCategoriesById: builder.query<
      IGenericApiResponse<IResearchCategory[]>,
      number
    >({
      query: (ResearchCategoryId) => ({
        url: `/GetAllChildrenCategoriesById?ResearchCategoryId=${ResearchCategoryId}`,
        method: "GET",
      }),
      providesTags: [{ type: "ResearchCategory", id: "List" }],
    }),
  }),
});

export const {
  useAddNewResearchCategoryMutation,
  useLazyGetAllResearchCategoriesByResearchTypeIdQuery,
  useGetAllResearchCategoriesByResearchTypeIdQuery,
  useLazyGetAllChildrenCategoriesByIdQuery,
} = researchCategoryApiSlice;
