import { z } from "zod";

export const applicantEducationInfoSchema = z.object({
  minstryEducationTypeId: z
    .number()
    .min(1, { message: "يجب اختيار نوع التعليم من القائمة." }),
  minstryEducationTLevelId: z
    .number()
    .min(1, { message: "يجب اختيار مستوى التعليم من القائمة." }),
  notes: z
    .string()
    .min(1, { message: "يرجى إدخال ملاحظاتك، هذا الحقل مطلوب." }),
});

export type TApplicantEducationInfoSchema = z.infer<
  typeof applicantEducationInfoSchema
>;

export const applicantEducationInfoDefaultValues: TApplicantEducationInfoSchema =
  {
    minstryEducationTypeId: 0,
    minstryEducationTLevelId: 0,
    notes: "",
  };
