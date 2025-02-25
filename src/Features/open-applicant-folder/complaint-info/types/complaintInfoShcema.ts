import { z } from "zod";

export const applicantComplaintInfoSchema = z.object({
  ComplaintIds: z
    .array(z.number().min(1, { message: "يجب تحديد شكوى واحدة على الأقل." }))
    .min(1, {
      message: "يرجى اختيار شكوى واحدة على الأقل من القائمة.",
    }),
  notes: z
    .string()
    .min(1, { message: "يرجى إدخال ملاحظاتك، هذا الحقل مطلوب." }),
});

export type TApplicantComplaintInfoSchema = z.infer<
  typeof applicantComplaintInfoSchema
>;

export const applicantComplaintInfoDefaultValues: TApplicantComplaintInfoSchema =
  {
    ComplaintIds: [],
    notes: "",
  };
