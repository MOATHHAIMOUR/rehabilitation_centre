import { ElementType } from "react";

// UI Interfaces
export interface IInputFiled {
  label: string;
  isRequired: boolean;
  type: "text" | "date" | "phone" | "email" | "nationality";
  customClass?: string;
  Icon?: ElementType;
}
export interface IGenreicTaps<T> {
  Tap: T;
  Title: string;
}

// API Interfaces For Open  New Folder Applicant
export interface IMinistryEducation {
  ministryEducationId: number;
  nameAr: string;
}

export interface IApplicantclassfictionType {
  applicantClassificationTypeId: number;
  nameAr: string;
}

export interface IMinistryEducationLevel {
  ministryEducationLevelId: number;
  levelAr: string;
}

export interface IApplicantComplaint {
  complaintId: number;
  complaintNameAr: string;
  descriptionAr: string;
}
export interface INewCompanyInfo {
  workSectorType: number;
  workFieldId: number;
  companeyName: string;
}

// Open Folder Applicant Form Interface
export interface IPersonlInfo {
  nationalIdOrIqama: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  fourthName: string;
  fullName?: string;
  dateOfBirthEn?: string;
  contactInfo: IContactInfo;
  gender: 0 | 1;
  nationality: string;
}
export interface IContactInfo {
  phoneNumber: string;
  phoneNumber2: string;
  email?: string;
}
export interface ApplicantLocationInfo {
  countryId: number;
  regionId: number;
  cityId: number;
  districtId: number;
  streetName?: string;
  homeNumber: string;
}
export interface IApplicantClassification {
  classdificationTypeId: number;
  note: string;
}
export interface IApplicantEducationInfo {
  MinstryEducationTypeId: number;
  MinstryEducationTLevelId: number;
  note: string;
}
export interface IApplicantComplaintInfo {
  ComplaintIds: number[];
  note: string;
}
export interface IWorkInfo {
  workSectorType: number;
  workFieldId: number;
  companeyId: number;
  jopTitleId: number;
  note: string;
  IsWorking: boolean;
  IsRetired: boolean;
  workPhone: string;
}
export interface IApplicantParentInfo {
  personInfo: IPersonlInfo;
  workInfo: IWorkInfo;
  note: string;
}
export interface IApplicantRelativeInfo {
  RelativeTypeId: number;
  Name: string;
  phone: string;
}
export interface IApplicantInsuranceInfo {
  insuranceTypeID: number;
  insuranceLevelId: number;
  doseHaveInsurance: boolean;
  note: string;
}
export interface IOpenApplicantFolder {
  applicatnPersonInfo: IPersonlInfo;
  applicantClassfication: IApplicantClassification;
  applicantComplaint: IApplicantComplaintInfo;
  applicantEducationInfo: IApplicantEducationInfo;
  applicantLocationInfo: ApplicantLocationInfo;
  applicantFatherInfo: IApplicantParentInfo;
  applicantMotherInfo: IApplicantParentInfo;
  applicatnWorkInfo: IWorkInfo;
  applicantRelativeInfo: IApplicantRelativeInfo;
  applicantInsuranceInfo: IApplicantInsuranceInfo;
}
