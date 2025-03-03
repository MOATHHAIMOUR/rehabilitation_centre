import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../../interfaces";

export const applicantFolderApiSlice = createApi({
  reducerPath: "applicantFolderApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/ApplicantFolder/",
  }), // Base URL for the API
  endpoints: (builder) => ({
    // Fetch all Ministry Educations
    isApplicantExists: builder.query<IGenericApiResponse<string>, string>({
      query: () => "CheekIsApplicantExists",
    }),
  }),
});

export const { useLazyIsApplicantExistsQuery } = applicantFolderApiSlice;
