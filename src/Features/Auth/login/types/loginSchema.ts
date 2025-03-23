import { z } from "zod";

export const loginSchema = z.object({
  nationalNo: z
    .string()
    .min(10, "يجب أن يتكون الرقم الوطني من 10 أرقام")
    .max(10, "يجب أن يتكون الرقم الوطني من 10 أرقام"),
  password: z.string().min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"),
  rememberMe: z.boolean().optional(),
});

export type TLoginFormSchema = z.infer<typeof loginSchema>;

export const loginFormSchemaDefaultValues: TLoginFormSchema = {
  nationalNo: "",
  password: "",
  rememberMe: false,
};
