import { IOpenApplicantFormData } from "../store/SaveApplicantSlice";

export const hrefToKeyMap: Record<string, keyof IOpenApplicantFormData> = {
  "/applicant-folder/add-applicant/personal-info": "personalInfo",
  "/applicant-folder/applicant/classification-info": "classification",
  "/applicant-folder/applicant/education-info": "education",
  "/applicant-folder/applicant/complaints-info": "complaints",
  "/applicant-folder/applicant/work-info": "workInfo",
  "/applicant-folder/applicant/parents-info": "parentsInfo",
  "/applicant-folder/applicant/relatives-info": "relativesInfo",
  "/applicant-folder/applicant/insurance-info": "insuranceInfo",
};
