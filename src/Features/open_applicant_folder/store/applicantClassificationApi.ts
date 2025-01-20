import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApplicantclassfictionType } from "../interface";
import { IGenericApiResponse } from "../../../interfaces";

export const applicantClassificationApi = createApi({
  reducerPath: "applicantClassificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/ApplicantClassification/",
  }), // Base URL for the API
  endpoints: (builder) => ({
    // Fetch all Ministry Educations
    getApplicantClassficationTypes: builder.query<
      IGenericApiResponse<IApplicantclassfictionType[]>,
      void
    >({
      query: () => "ApplicantClassficationTypes",
    }),
  }),
});

export const { useGetApplicantClassficationTypesQuery } =
  applicantClassificationApi;
