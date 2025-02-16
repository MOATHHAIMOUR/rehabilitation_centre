import { z } from "zod";
import validator from "validator";

export const applicantWorkSchema = z.object({
  workPhone: z
    .string()
    .nonempty("رقم الجوال مطلوب.")
    .refine(
      (val) => validator.isMobilePhone(val, "ar-SA"),
      "يجب أن يكون رقم الجوال بصيغة صحيحة داخل المملكة العربية السعودية."
    ),
  companyId: z.number().min(1),
  sectorId: z.number().min(1),
  industryField: z.number().min(1),

  notes: z.string(),
});

export type TApplicantWorkSchema = z.infer<typeof applicantWorkSchema>;

export const applicantWorkSchemaDefaultValues: TApplicantWorkSchema = {
  companyId: 0,
  industryField: 0,
  notes: "",
  sectorId: 0,
  workPhone: "",
};
