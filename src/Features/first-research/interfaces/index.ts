import { EnumApplicationType } from "../Enum";

interface IAddNewResearchQuestion {
  questionId: number;
  anwerText: string;
  answerChoices: number[];
}

export interface IAddNewResearsh {
  applicationType: EnumApplicationType;
  Questions: IAddNewResearchQuestion[];
}


