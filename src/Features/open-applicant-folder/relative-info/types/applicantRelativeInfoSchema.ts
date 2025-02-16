import validator from "validator";
import { z } from "zod";

export const applicantRelativeInfoSchema = z.object({
  relativeTypeId: z.number().min(1),
  relativeName: z.string().min(1),
  relativePhone: z
    .string()
    .nonempty("رقم الجوال مطلوب.")
    .refine(
      (val) => validator.isMobilePhone(val, "ar-SA"),
      "يجب أن يكون رقم الجوال بصيغة صحيحة داخل المملكة العربية السعودية."
    ),
});

export type TApplicantRelativeInfoSchema = z.infer<
  typeof applicantRelativeInfoSchema
>;

export const applicantRelativeInfoSchemaDefaultValues: TApplicantRelativeInfoSchema =
  {
    relativeName: "",
    relativePhone: "",
    relativeTypeId: 0,
  };
