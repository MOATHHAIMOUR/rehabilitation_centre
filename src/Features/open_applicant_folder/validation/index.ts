import { z } from "zod";

export const OpenFolderInfoSchema = z.object({
  personInfo: z.object({
    nationalIdOrIqama: z
      .string()
      .length(10, "رقم الهوية أو الإقامة يجب أن يكون 10 أرقام")
      .regex(/^\d+$/, "رقم الهوية أو الإقامة يجب أن يحتوي على أرقام فقط"),
    firstName: z
      .string()
      .min(1, "الإسم الأول مطلوب")
      .regex(/^[\p{L} ]+$/u, "الإسم الأول يجب أن يحتوي على أحرف فقط"),
    secondName: z
      .string()
      .min(1, "الإسم الثاني مطلوب")
      .regex(/^[\p{L} ]+$/u, "الإسم الثاني يجب أن يحتوي على أحرف فقط"),
    thirdName: z
      .string()
      .min(1, "الإسم الثالث مطلوب")
      .regex(/^[\p{L} ]+$/u, "الإسم الثالث يجب أن يحتوي على أحرف فقط"),
    fourthName: z
      .string()
      .min(1, "الإسم الرابع مطلوب")
      .regex(/^[\p{L} ]+$/u, "الإسم الرابع يجب أن يحتوي على أحرف فقط"),
    phoneNumber: z
      .string()
      .regex(/^05\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"),
    secondaryPhoneNumber: z
      .string()
      .regex(
        /^05\d{8}$/,
        "رقم الهاتف الثاني يجب أن يبدأ بـ 05 ويتكون من 10 أرقام"
      )
      .optional(),
    email: z.string().email("البريد الإلكتروني غير صحيح").optional(),

    dateOfBirthEn: z
      .any()
      .optional()
      .superRefine((value, ctx) => {
        if (value === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "تاريخ مطلوب",
          });
        }
      }),
    gender: z
      .string()
      .optional()
      .superRefine((value, ctx) => {
        if (value === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "الجنس مطلوب",
          });
        } else if (value !== "1" && value !== "2") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "الجنس غير صحيح", // Validation: Must be "1" or "2"
          });
        }
      }),
    nationality: z.string().min(1, "الجنسية مطلوبة"),
    location: z.object({
      countryId: z.string().min(1, "الدولة مطلوبة"),
      regionId: z.string().min(1, "المنطقة مطلوبة"),
      cityId: z.string().min(1, "المدينة مطلوبة"),
      districtId: z.string().min(1, "الحي مطلوب"),
      streetName: z.string().optional(),
    }),
  }),
});
