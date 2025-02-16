import { z } from "zod";
import { EnumAnswerType } from "../../question-management/enums";

const notesSchema = z.discriminatedUnion("isHasNotes", [
  z.object({
    isHasNotes: z.literal(true),
    notes: z
      .string()
      .min(1, "الرجاء تعبئة الملاحظات أو القيام بإلغائها")
      .default(""),
  }),
  z.object({
    isHasNotes: z.literal(false),
    notes: z.null().optional(),
  }),
]);

export const researchInfoSchema = z.object({
  questionsAnswers: z.array(
    z
      .object({
        questionId: z.preprocess(
          (val) => Number(val), // ✅ Converts "5" → 5
          z.number()
        ),
        answerType: z.preprocess(
          (val) => parseFloat(val as string),
          z.nativeEnum(EnumAnswerType)
        ),
        isRequired: z.enum(["yes", "no"]),
        isHasNotes: z.boolean().default(false),

        answer: z
          .union([
            z.string(), // ✅ Allow empty string, validation happens in `superRefine`
            z.number(),
            z.array(z.number()),
            z.undefined(), // ✅ Allow undefined if not required
            z.null(), // ✅ Allow null if not required
          ])
          .optional(),
      })
      .and(notesSchema)
      .superRefine((data, ctx) => {
        const { answerType, isRequired, answer } = data;

        // ✅ If the question is not required, allow empty values
        if (isRequired === "no") return;

        // ✅ If required, check that the answer meets the necessary conditions
        switch (answerType) {
          case EnumAnswerType.Binery:
          case EnumAnswerType.Good_bad:
          case EnumAnswerType.SelecetMenuWithOneAnswer:
            if (typeof answer !== "number" || answer <= 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                  "السؤال ضمن الاسئلة المطلوبه الرجاء إجابة السؤال نصياَ",
                path: ["answer"],
              });
            }
            break;

          case EnumAnswerType.MultiSelecetMenuWithMultibleAnswer:
            if (!Array.isArray(answer) || answer.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Select at least one option.",
                path: ["answer"],
              });
            }
            break;

          case EnumAnswerType.TextAnswer:
            if (typeof answer !== "string" || answer.length < 5) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "يجب أن يكون الجواب نصيًا وطوله 5 أحرف على الأقل.",
                path: ["answer"],
              });
            }
            break;
        }
      })
  ),
});

export type TResearchInfoSchema = z.infer<typeof researchInfoSchema>;

export const researchInfoSchemaDefaultValues: TResearchInfoSchema = {
  questionsAnswers: [],
};
