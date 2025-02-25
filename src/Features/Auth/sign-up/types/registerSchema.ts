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

    phone: z
      .string()
      .refine(
        (val) => validator.isMobilePhone(val, "ar-SA"),
        "يجب أن يكون رقم الجوال بصيغة صحيحة داخل المملكة العربية السعودية."
      ),

    isOTPSent: z.boolean(),

    isPhoneConfirmed: z.boolean().refine((val) => val === true, {
      message: "يجب تاكيد رقم الهاتف أولاً",
    }),

    email: z.string().email("البريد الإلكتروني غير صالح"),

    password: z
      .string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .max(30, "كلمة المرور لا يجب أن تتجاوز 30 حرفاً"),

    confirmPassword: z.string(),
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
  email: "",
  password: "",
  confirmPassword: "",
  isOTPSent: false,
  isPhoneConfirmed: false,
};
