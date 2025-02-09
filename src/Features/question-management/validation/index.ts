import { z } from "zod";
import { EnumAnswerType, EnumWhenToShowQuestion } from "../enums";

// ✅ Discriminated Union for Dependent Question
const debendQuestionSchema = z.discriminatedUnion("hasDebenQuestion", [
  z.object({
    hasDebenQuestion: z.literal(true),
    debendQuestion: z.object({
      nameAr: z.string().min(1, "هذا الحقل مطلوب"),
      answerTypeId: z.nativeEnum(EnumAnswerType, {
        errorMap: () => ({ message: "اختر خيارا صحيحا" }),
      }),
      choices: z
        .array(
          z.object({
            id: z.number().min(1, "معرف الخيار مطلوب"),
            value: z.string().min(1, "هذا الحقل مطلوب"),
          })
        )
        .nullable()
        .optional(),
      whenToDebShowQuestion: z
        .nativeEnum(EnumWhenToShowQuestion, {
          errorMap: () => ({ message: "متى يظهر السؤال التابع غير صالح" }),
        })
        .nullable()
        .optional(),
    }),
  }),
  z.object({
    hasDebenQuestion: z.literal(false),
    debendQuestion: z.object({}).nullable().optional(), // ✅ Optional empty object
  }),
]);

// ✅ Main Schema
const AddNewQuestionSchema = z
  .object({
    nameAr: z.string().min(1, "الأسم مطلوب"),
    choices: z
      .array(
        z.object({
          id: z.number().min(1, "معرف الخيار مطلوب"),
          value: z.string().min(1, "قيمة الخيار مطلوبة"),
        })
      )
      .nullable()
      .optional(),
    answerTypeId: z.nativeEnum(EnumAnswerType, {
      errorMap: () => ({ message: "اختر خيارا صحيحا" }),
    }),
  })
  .and(debendQuestionSchema); // ✅ Combine schemas

type AddNewQuestionSchemaType = z.infer<typeof AddNewQuestionSchema>;

export { AddNewQuestionSchema, type AddNewQuestionSchemaType };
