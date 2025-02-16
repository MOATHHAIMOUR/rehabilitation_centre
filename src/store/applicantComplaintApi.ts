import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericApiResponse } from "../interfaces";

interface IApplicantComplaintType {
  complaintId: number;
  complaintNameAr: string;
  descriptionAr: string;
}

export const applicantComplaintApi = createApi({
  reducerPath: "applicantComplaintApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7196/api/ApplicantComplaint/",
  }), // Base URL for the API
  endpoints: (builder) => ({
    // Fetch all Ministry Educations
    getApplicantComplaints: builder.query<
      IGenericApiResponse<IApplicantComplaintType[]>,
      void
    >({
      query: () => "GetAllComplaints",
    }),
  }),
});

export const { useGetApplicantComplaintsQuery } = applicantComplaintApi;
