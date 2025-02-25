import { z } from "zod";

const parentًWorkInfoSchema = z.discriminatedUnion("isHaveWorkInfo", [
  z.object({
    isHaveWorkInfo: z.literal(true), // Case where work info exists
    workInfo: z.object({
      workPhone: z
        .string()
        .min(10, "رقم هاتف العمل يجب أن يكون 10 أرقام")
        .max(10, "رقم هاتف العمل يجب أن يكون 10 أرقام")
        .regex(/^\d+$/, "رقم هاتف العمل يجب أن يحتوي على أرقام فقط"),
      companeyId: z.number().min(1, "يجب اختيار شركة"),
      workSectorType: z.number().min(1, "يجب اختيار قطاع العمل"),
      workFieldId: z.number().min(1, "يجب اختيار المجال"),
    }),
  }),
  z.object({
    isHaveWorkInfo: z.literal(false), // Case where work info is not present
    workInfo: z.never().optional(),
  }),
]);

const parentInfoSchema = z
  .object({
    personInfo: z.object({
      nationalIdOrIqama: z
        .string()
        .min(10, "رقم الهوية يجب أن يتكون من 10 أرقام")
        .max(10, "رقم الهوية يجب أن يتكون من 10 أرقام")
        .regex(/^\d+$/, "يجب أن يحتوي رقم الهوية على أرقام فقط"),

      fullName: z.string().min(3, "يجب إدخال الاسم الرباعي بالكامل"),

      dateOfBirthEn: z.date({
        required_error: "تاريخ الميلاد مطلوب",
        invalid_type_error: "تأكد من إدخال تاريخ الميلاد بشكل صحيح",
      }),

      phoneNumber: z
        .string()
        .min(10, "رقم الهاتف يجب أن يكون 10 أرقام")
        .max(10, "رقم الهاتف يجب أن يكون 10 أرقام")
        .regex(/^\d+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
      email: z
        .string()
        .email("يجب إدخال بريد إلكتروني صحيح")
        .optional()
        .or(z.literal("")), // Email is optional but must be valid if entered
    }),
    isHaveWorkInfo: z.boolean(),
  })
  .and(parentًWorkInfoSchema);

// Main Parent Schema (Combining Both)
export const applicantParentsInfoSchema = z.object({
  parentsInfo: z.object({
    father: parentInfoSchema,
    mother: parentInfoSchema,
  }),
});

export type TApplicantParentsInfoSchema = z.infer<
  typeof applicantParentsInfoSchema
>;

export const applicantParentsInfoSchemaDefaultValues: TApplicantParentsInfoSchema =
  {
    parentsInfo: {
      father: {
        personInfo: {
          nationalIdOrIqama: "",
          fullName: "",
          dateOfBirthEn: new Date(),
          phoneNumber: "",
          email: "",
        },
        isHaveWorkInfo: false,
      },
      mother: {
        personInfo: {
          nationalIdOrIqama: "",
          fullName: "",
          dateOfBirthEn: new Date(),
          phoneNumber: "",
          email: "",
        },
        isHaveWorkInfo: false,
      },
    },
  };
