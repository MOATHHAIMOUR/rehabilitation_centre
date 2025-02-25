import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TapplicantPersonalInfoSchema } from "../../personal-info/types/applicantPersonalInfoSchema";
import { TApplicantClassificationInfoSchema } from "../../classification-info/types/applicantClassificationInfoSchema";
import { TApplicantEducationInfoSchema } from "../../education-info/types/applicantClassificationInfoSchema";
import { TApplicantComplaintInfoSchema } from "../../complaint-info/types/complaintInfoShcema";
import { TApplicantWorkSchema } from "../../work-info/types/applicantWorkSchema";
import { TApplicantParentsInfoSchema } from "../../parents-info/types/ApplicantParentsSchema";
import { TApplicantRelativeInfoSchema } from "../../relative-info/types/applicantRelativeInfoSchema";
import { TApplicantInsuranceInfoSchema } from "../../insurance-info/types/applicantInsuranceInfoSchema";

// including the form value and other meata-data about form
interface IGenericFormInfo<T> {
  formData: T | null;
  path: string;
  IsValid: boolean;
}

export interface IOpenApplicantFormData {
  personalInfo: IGenericFormInfo<TapplicantPersonalInfoSchema>;
  classification: IGenericFormInfo<TApplicantClassificationInfoSchema>;
  education: IGenericFormInfo<TApplicantEducationInfoSchema>;
  complaints: IGenericFormInfo<TApplicantComplaintInfoSchema>;
  workInfo: IGenericFormInfo<TApplicantWorkSchema>;
  parentsInfo: IGenericFormInfo<TApplicantParentsInfoSchema>;
  relativesInfo: IGenericFormInfo<TApplicantRelativeInfoSchema>;
  insuranceInfo: IGenericFormInfo<TApplicantInsuranceInfoSchema>;
}

// SLICE STATE
interface ISaveApplicantSliceState {
  openApplicantFormsData: IOpenApplicantFormData;
  currentFormData: keyof IOpenApplicantFormData;
}

// Initial State
const initialState: ISaveApplicantSliceState = {
  openApplicantFormsData: {
    classification: {
      formData: null,
      IsValid: false,
      path: "/applicant/classification-info",
    },
    complaints: {
      formData: null,
      IsValid: false,
      path: "/applicant/complaints-info",
    },
    education: {
      formData: null,
      IsValid: false,
      path: "/applicant/education-info",
    },
    insuranceInfo: {
      formData: null,
      IsValid: false,
      path: "/applicant/insurance-info",
    },
    workInfo: { formData: null, IsValid: false, path: "/applicant/work-info" },
    parentsInfo: {
      formData: null,
      IsValid: false,
      path: "/applicant/parents-info",
    },
    personalInfo: {
      formData: null,
      IsValid: false,
      path: "/add-applicant/personal-info ",
    },
    relativesInfo: {
      formData: null,
      IsValid: false,
      path: "/applicant/relatives-info",
    },
  },
  currentFormData: "personalInfo",
};

// Create Redux Slice
const SaveApplicantFolderSlice = createSlice({
  name: "SaveApplicantSlice",
  initialState,
  reducers: {
    // after pass the form validation here we can save the value and make the flage is valied set to true
    saveForm: (
      state: ISaveApplicantSliceState,
      action: PayloadAction<{
        key: keyof IOpenApplicantFormData;
        value: IOpenApplicantFormData[keyof IOpenApplicantFormData]["formData"];
      }>
    ) => {
      // save the form value to global state
      state.openApplicantFormsData[action.payload.key].formData =
        action.payload.value;
      //set IsValid form to true
      state.openApplicantFormsData[action.payload.key].IsValid = true;
    },
    // navigation dose not meen passing the form validation so here we can save the value of form only
    navigateToNextForm: (
      state: ISaveApplicantSliceState,
      action: PayloadAction<{
        key: keyof IOpenApplicantFormData;
        value: IOpenApplicantFormData[keyof IOpenApplicantFormData]["formData"];
      }>
    ) => {
      // save the form value to global state
      state.openApplicantFormsData[action.payload.key].formData =
        action.payload.value;
    },
    // Sync any error happen with form status
    onErrorForm: (
      state: ISaveApplicantSliceState,
      action: PayloadAction<{
        key: keyof IOpenApplicantFormData;
      }>
    ) => {
      state.openApplicantFormsData[action.payload.key].IsValid = false;
    },
    //set active form
    setActiveForm: (
      state: ISaveApplicantSliceState,
      action: PayloadAction<keyof IOpenApplicantFormData>
    ) => {
      state.currentFormData = action.payload;
    },
  },
});

// Export Actions
export const { navigateToNextForm, setActiveForm, onErrorForm, saveForm } =
  SaveApplicantFolderSlice.actions;

// Export Reducer
export default SaveApplicantFolderSlice.reducer;
