import { EnumAnswerType } from "../enums";

export const isAnswerTypeMenu = (type: EnumAnswerType | null) =>
  type === EnumAnswerType.MultiSelecetMenuWithMultibleAnswer ||
  type === EnumAnswerType.SelecetMenuWithOneAnswer;
