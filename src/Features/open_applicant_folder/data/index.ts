import { IGenreicTaps } from "../interface";
import { TAddNewApplicantTaps } from "../types";

export const applicantTapsData: Array<IGenreicTaps<TAddNewApplicantTaps>> = [
  {
    Tap: "personalInfo",
    Title: "NewApplicantForm.personalInfo",
  },
  {
    Tap: "ApplicantClassification",
    Title: "NewApplicantForm.ApplicantClassification",
  },
  {
    Tap: "ApplicantEducationalInfo",
    Title: "NewApplicantForm.ApplicantEducationalInfo",
  },
  {
    Tap: "ApplicantComplaints",
    Title: "NewApplicantForm.ApplicantComplaints",
  },
  {
    Tap: "ApplicantParentsInfo",
    Title: "NewApplicantForm.ApplicantParentsInfo",
  },
  {
    Tap: "ApplicantWorkInfo",
    Title: "NewApplicantForm.ApplicantWorkInfo",
  },
  {
    Tap: "ApplicantRelativeInfo",
    Title: "NewApplicantForm.ApplicantRelativeInfo",
  },
  {
    Tap: "ApplicantInsuranceInfo",
    Title: "NewApplicantForm.ApplicantInsuranceInfo",
  },
];
