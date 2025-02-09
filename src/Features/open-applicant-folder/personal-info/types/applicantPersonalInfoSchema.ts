import { z } from "zod";
import validator from "validator";
import { EnumGender } from "../../../../enums";

const defaultBirthDate = (): Date => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
};

export const applicantPersonalInfoSchema = z.object({
  nationalNumber: z
    .string()
    .nonempty("الرقم الوطني مطلوب.")
    .length(10, "يجب أن يتكون الرقم الوطني من 10 أرقام.")
    .regex(
      /^\d{10}$/,
      "يجب أن يحتوي الرقم الوطني على أرقام فقط دون أي رموز أو أحرف."
    ),

  firstName: z
    .string()
    .min(1, "الاسم الأول مطلوب.")
    .max(50, "يجب ألا يتجاوز الاسم الأول 50 حرفًا."),

  secondName: z
    .string()
    .min(1, "الاسم الثاني مطلوب.")
    .max(50, "يجب ألا يتجاوز الاسم الثاني 50 حرفًا."),

  thirdName: z
    .string()
    .min(1, "الاسم الثالث مطلوب.")
    .max(50, "يجب ألا يتجاوز الاسم الثالث 50 حرفًا."),

  lastName: z
    .string()
    .min(1, "اسم العائلة مطلوب.")
    .max(50, "يجب ألا يتجاوز اسم العائلة 50 حرفًا."),

  birthDate: z.coerce
    .date()
    .refine(
      (date) => date <= new Date(),
      "يجب أن يكون تاريخ الميلاد صحيحًا ولا يمكن أن يكون في المستقبل."
    ),

  phoneNumber: z
    .string()
    .nonempty("رقم الجوال مطلوب.")
    .refine(
      (val) => validator.isMobilePhone(val, "ar-SA"),
      "يجب أن يكون رقم الجوال بصيغة صحيحة داخل المملكة العربية السعودية."
    ),

  phoneNumber2: z
    .string()
    .optional()
    .refine(
      (val) => !val || validator.isMobilePhone(val, "ar-SA"),
      "يجب أن يكون رقم الجوال الثاني بصيغة صحيحة داخل المملكة العربية السعودية."
    ),

  email: z
    .string()
    .nonempty("البريد الإلكتروني مطلوب.")
    .email("يرجى إدخال بريد إلكتروني صالح."),

  gender: z.nativeEnum(EnumGender, {
    errorMap: () => ({ message: "تحديد الجنس مطلوب." }),
  }),

  nationality: z.number().min(1, "يرجى اختيار الجنسية."),

  applicantLocationInfo: z.object({
    regionId: z.number().min(1, "يرجى تحديد المنطقة."),

    cityId: z.number().min(1, "يرجى تحديد المدينة."),

    districtId: z.number().min(1, "يرجى تحديد الحي."),

    streetNumber: z
      .string()
      .nonempty("رقم الشارع مطلوب.")
      .max(50, "يجب ألا يتجاوز رقم الشارع 50 حرفًا."),

    homeNumber: z
      .string()
      .nonempty("رقم المنزل مطلوب.")
      .max(50, "يجب ألا يتجاوز رقم المنزل 50 حرفًا."),
  }),
});

export type TapplicantPersonalInfoSchema = z.infer<
  typeof applicantPersonalInfoSchema
>;

export const defaultValues: TapplicantPersonalInfoSchema = {
  nationalNumber: "",
  firstName: "",
  secondName: "",
  thirdName: "",
  lastName: "",
  birthDate: defaultBirthDate(),
  phoneNumber: "",
  phoneNumber2: "",
  email: "",
  gender: EnumGender.Male,
  nationality: 0,
  applicantLocationInfo: {
    regionId: 0,
    cityId: 0,
    districtId: 0,
    streetNumber: "",
    homeNumber: "",
  },
};
