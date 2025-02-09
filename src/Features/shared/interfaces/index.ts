import {
  EnumAnswerType,
  EnumWhenToShowQuestion,
} from "../../question_management/enums";

export interface ICountry {
  countryId: number;
  nameAr: string;
}

export interface IRegion {
  regionId: number;
  nameAr: string;
}

export interface ICity {
  cityId: number;
  nameAr: string;
}

export interface IDistrict {
  districtId: number;
  nameAr: string;
}

interface QuestionChoice {
  questionChoiceId: number;
  choiceName: string;
}

export interface IQuestion {
  questionId: number;
  nameAr: string;
  parentQuestionId: number;
  answerTypeId: EnumAnswerType;
  whenToShowQuestion: EnumWhenToShowQuestion;
  questionsChoices: QuestionChoice[];
}
