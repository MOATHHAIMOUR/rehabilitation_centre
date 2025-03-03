import { z } from "zod";
import { EnumAnswerType } from "../../question-management/enums";

const notesSchema = z.discriminatedUnion("isHasNotes", [
  z.object({
    isHasNotes: z.literal(true),
    notes: z.string().min(1, "الرجاء تعبئة الملاحظات أو القيام بإلغائها"),
  }),
  z.object({
    isHasNotes: z.literal(false),
    notes: z.null().optional(),
  }),
]);

export const researchInfoSchema = z.object({
  questions: z.array(
    z
      .object({
        // questionId: z.preprocess(
        //   (val) => Number(val), // Convert string to number
        //   z.number() // Validate as number
        // ) as z.ZodEffects<z.ZodNumber>,

        questionId: z.number().optional().nullable(),

        questionText: z.string().optional().nullable(),
        // answerType: z.preprocess(
        //   (val) => Number(val),
        //   z.nativeEnum(EnumAnswerType)
        // ) as z.ZodEffects<z.ZodNativeEnum<typeof EnumAnswerType>>,

        answerType: z.number(),

        questionChoices: z
          .array(
            z.object({
              value: z.number(),
              label: z.string(),
            })
          )
          .nullable()
          .optional(),

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

          case EnumAnswerType.Binery:
            if (
              typeof answer !== "string" ||
              !["yes", "no", "none"].includes(answer)
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a valid option (yes, no, or none).",
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
  questions: [],
};
