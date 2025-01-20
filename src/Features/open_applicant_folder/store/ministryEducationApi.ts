import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../../interfaces";
import { IMinistryEducation, IMinistryEducationLevel } from "../interface";

export const ministryApi = createApi({
  reducerPath: "ministryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/MinistryEducation/",
  }), // Base URL for the API
  endpoints: (builder) => ({
    // Fetch all Ministry Educations
    getMinistryEducations: builder.query<
      IGenericApiResponse<IMinistryEducation[]>,
      void
    >({
      query: () => "GetAllMinistryEducations",
    }),
    // Fetch Ministry Education Levels by MinistryEducationId
    getMinistryEducationLevelsById: builder.query<
      IGenericApiResponse<IMinistryEducationLevel[]>,
      number
    >({
      query: (id) =>
        `GetAllMinistryEducationLevelsByMinistryEducationId?MinistryEducationId=${id}`,
    }),
  }),
});

export const {
  useGetMinistryEducationsQuery,
  useLazyGetMinistryEducationLevelsByIdQuery,
} = ministryApi;
