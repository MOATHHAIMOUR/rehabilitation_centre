import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";

export interface IResearchType {
  researchTypeId: number;
  researchTypeNameAr: string;
  researchTypeNameEn: string;
}

export interface INewResearchType {
  researchTypeNameAr: string;
  researchTypeNameEn: string;
}

export const researchTypeSliceApi = createApi({
  reducerPath: "researchTypeSliceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/ResearchType/",
  }),
  tagTypes: ["Research", "ResearchType"], // Define tags for caching
  endpoints: (builder) => ({
    addNewResearchType: builder.mutation<
      IGenericApiResponse<string>,
      INewResearchType
    >({
      query: (newStage) => ({
        url: "AddNewResearchType",
        method: "POST",
        body: newStage,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "ResearchType", id: "LIST" }],
    }),

    GetAllResearchTypes: builder.query<
      IGenericApiResponse<IResearchType[]>,
      void
    >({
      query: () => ({
        url: "GetAllResearchTypes",
        method: "GET",
      }),
      providesTags: [{ type: "ResearchType", id: "LIST" }], // Provides tags for caching
    }),
  }),
});

export const { useAddNewResearchTypeMutation, useGetAllResearchTypesQuery } =
  researchTypeSliceApi;
