import validator from "validator";
import { z } from "zod";

const OTPSchema = z.discriminatedUnion("isOTPSent", [
  z.object({
    isOTPSent: z.literal(true),
    phoneConfirmationField: z
      .string()
      .length(6, "رمز التحقق مكون يجب أن يتكون من 6 أرقام")
      .regex(/^\d{6}$/, "OTP must be a 6-digit number"),
  }),
  z.object({
    isOTPSent: z.literal(false),
    phoneConfirmationField: z.null().optional(),
  }),
]);

export const registerSchema = z
  .object({
    nationalNo: z
      .string()
      .min(10, "الرقم الوطني يجب أن يكون 10 أرقام")
      .max(10, "الرقم الوطني يجب أن يكون 10 أرقام")
      .regex(/^\d+$/, "الرقم الوطني يجب أن يحتوي على أرقام فقط"),

    firstName: z
      .string()
      .min(2, "يجب أن يكون الاسم الأول على الأقل حرفين")
      .max(15, "يجب ألا يزيد الاسم الأول عن 15 حرفاً"),

    lastName: z
      .string()
      .min(2, "يجب أن يكون الاسم الأخير على الأقل حرفين")
      .max(15, "يجب ألا يزيد الاسم الأخير عن 15 حرفاً"),

    isPhoneValied: z.boolean(),
    phone: z
      .string()
      .min(1, "رقم الهاتف مطلوب")
      .refine(
        (val) => validator.isMobilePhone(val, "ar-SA"),
        "يجب أن يكون رقم الجوال بصيغة صحيحة داخل المملكة العربية السعودية."
      ),

    isOTPSent: z.boolean().default(false),

    isPhoneConfirmed: z.boolean().refine((val) => val === true, {
      message: "يجب تاكيد رقم الهاتف أولاً",
    }),

    email: z
      .string()
      .optional()
      .refine(
        (d) => !d || z.string().email().safeParse(d).success,
        "البريد الإلكتروني غير صالح"
      ),

    password: z.string().min(1, "الرجاء إدخال كلمة المرور"),
    isPasswordValied: z.boolean(),
    confirmPassword: z.string().min(1, "الرجاء تأكيد كلمة المرور"),
  })
  .refine((data) => data.isPhoneConfirmed, {
    message: "يجب تأكيد رقم الهاتف",
    path: ["isPhoneConfirmed"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة المرور وتأكيدها غير متطابقين",
    path: ["confirmPassword"],
  })
  .and(OTPSchema);

export type TRegisterFormSchema = z.infer<typeof registerSchema>;

export const registerFormSchemaDefaultValues: TRegisterFormSchema = {
  nationalNo: "",
  firstName: "",
  lastName: "",
  phone: "",
  isPasswordValied: false,
  isPhoneValied: false,
  email: "",
  password: "",
  confirmPassword: "",
  isOTPSent: false,
  isPhoneConfirmed: false,
};
