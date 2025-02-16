import { EnumAnswerType, EnumWhenToShowQuestion } from "../enums";

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
