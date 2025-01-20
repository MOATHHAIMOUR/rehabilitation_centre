import { ElementType } from "react";

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

export interface IGenreicTaps<T> {
  Tap: T;
  Title: string;
}

export interface IInputFiled {
  label: string;
  isRequired: boolean;
  type: "text" | "date" | "phone" | "email" | "nationality";
  customClass?: string;
  Icon?: ElementType;
}

export interface IPersonlInfo {
  nationalIdOrIqama: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  fourthName: string;
  dateOfBirthEn?: string;
  phoneNumber: string;
  secondaryPhoneNumber?: string;
  email?: string;
  gender: 0 | 1;
  nationality: string;
  location: {
    countryId: number;
    regionId: number;
    cityId: number;
    districtId: number;
    streetName?: string;
    homeNumber: string;
  };
}

export interface IApplicantComplaint {
  complaintId: number;
  complaintNameAr: string;
  descriptionAr: string;
}

// Open Folder Form Interface
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

export interface IOpenApplicantFolder {
  personInfo: IPersonlInfo;
  applicantClassfication: IApplicantClassification;
  applicantEducationInfo: IApplicantEducationInfo;
  applicantComplaint: IApplicantComplaintInfo;
}
