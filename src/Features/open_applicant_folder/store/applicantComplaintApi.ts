import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IApplicantComplaint } from "../interface";
import { IGenericApiResponse } from "../../../interfaces";

export const applicantComplaintApi = createApi({
  reducerPath: "applicantComplaintApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/ApplicantComplaint/",
  }), // Base URL for the API
  endpoints: (builder) => ({
    // Fetch all Ministry Educations
    getApplicantComplaints: builder.query<
      IGenericApiResponse<IApplicantComplaint[]>,
      void
    >({
      query: () => "GetAllComplaints",
    }),
  }),
});

export const { useGetApplicantComplaintsQuery } = applicantComplaintApi;
