import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INewStageType, IStageType } from "../interfaces";
import { IGenericApiResponse } from "../../../interfaces";

export const newStageApi = createApi({
  reducerPath: "newStageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/Stage",
  }),
  tagTypes: ["Stage", "StageTypes"], // Define tags for caching
  endpoints: (builder) => ({
    addNewStage: builder.mutation<IGenericApiResponse<string>, INewStageType>({
      query: (newStage) => ({
        url: "/AddNewStage",
        method: "POST",
        body: newStage,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "StageTypes", id: "LIST" }],
    }),

    GetAllStagesTypes: builder.query<IGenericApiResponse<IStageType[]>, void>({
      query: () => ({
        url: "/StageTypes",
        method: "GET",
      }),
      providesTags: [{ type: "StageTypes", id: "LIST" }], // Provides tags for caching
    }),
  }),
});

export const { useAddNewStageMutation, useGetAllStagesTypesQuery } =
  newStageApi;
