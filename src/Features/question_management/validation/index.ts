import { z } from "zod";
import { EnumAnswerType, EnumWhenToShowQuestion } from "../enums";

// Updated Zod Schema
export const AddNewQSchema = z.object({
  nameAr: z.string().min(1, "الاسم بالعربية مطلوب"),
  answerTypeId: z.nativeEnum(EnumAnswerType, {
    errorMap: () => ({ message: "نوع الإجابة غير صالح" }),
  }),
  choices: z
    .array(
      z
        .object({
          id: z.number().min(1, "معرف الخيار مطلوب"),
          value: z.string().min(1, "قيمة الخيار مطلوبة"),
        })
        .nullable() // Allow null values
    )
    .nullable(),

  debendQuestion: z
    .object({
      nameAr: z
        .string()
        .min(1, "الاسم بالعربية مطلوب")
        .nullable()
        .refine((val) => val !== null && val !== "", "الاسم بالعربية مطلوب"),

      answerTypeId: z.nativeEnum(EnumAnswerType, {
        errorMap: () => ({ message: "نوع الإجابة للسؤال التابع غير صالح" }),
      }),
      choices: z
        .array(
          z.object({
            id: z.number().min(1, "معرف الخيار للسؤال التابع مطلوب"),
            value: z.string().min(1, "قيمة الخيار للسؤال التابع مطلوبة"),
          })
        )
        .nullable(),

      whenToDebShowQuestion: z.nativeEnum(EnumWhenToShowQuestion, {
        errorMap: () => ({ message: "متى يظهر السؤال التابع غير صالح" }),
      }),
    })
    .nullable(),
  // Allow null for the whole `debendQuestion` object
});

// export interface IFormAddNewQuestion {
//   nameAr: string;
//   parentQuestionId: number;
//   answerTypeId: EnumAnswerType;
//   choices: { id: number; value: string }[] | null;
//   debendQuestion: {
//     nameAr: string;
//     answerTypeId: EnumAnswerType;
//     choices: { id: number; value: string }[] | null; // Dynamic dependent choices
//     whenToDebShowQuestion: EnumWhenToShowQuestion;
//   } | null;
// }
