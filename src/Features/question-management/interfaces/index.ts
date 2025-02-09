import { EnumAnswerType, EnumWhenToShowQuestion } from "../enums";

export interface INewStageType {
  stageNameAr: string;
  stageDescriptionAr: string;
}

export interface IStageType {
  stageId: number;
  stageNameAr: string;
}

export interface IStageCategory {
  stageCategoryId: number;
  nameAr: string;
  stageId: number;
  parentStageId: number;
}

export interface INewStageCategory {
  nameAr: string;
  parentStageCategoryId: number | null;
  stageId: number;
}

export interface SearchKeyVal {
  key: number;
  name: string;
  options:
    | {
        label: string;
        value: number;
      }[]
    | undefined;
  SelectedValue: number | null;
}

export interface IFormAddNewQuestion {
  nameAr: string;
  answerTypeId: EnumAnswerType;
  choices?: { id: number; value: string }[];
  hasDebenQuestion: boolean;
  debendQuestion?: {
    nameAr: string;
    answerTypeId: EnumAnswerType;
    choices?: { id: number; value: string }[] | null; // Dynamic dependent choices
    whenToDebShowQuestion?: EnumWhenToShowQuestion;
  };
}

export interface IAddNewQuestion {
  nameAr: string;
  stageId: number;
  stageCategoryId: number;
  parentQuestionId: number | null;
  answerTypeId: EnumAnswerType;
  choices: string[] | null;
  debendQuestion: IAddNewQuestion | null;
  whenToShowQuestion: EnumWhenToShowQuestion | null;
}

export interface IAnswerType {
  answerTypeId: number;
  type: string;
  notes: string;
}
