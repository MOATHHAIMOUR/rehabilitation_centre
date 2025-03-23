import { z } from "zod";

export const personalInfoSchema = z.object({
  nationalNo: z.string().min(10, "رقم الهوية مطلوب ويجب أن لا يقل عن 10 أرقام"),
  firstName: z.string().min(2, "الاسم الأول مطلوب ويجب أن لا يقل عن حرفين"),
  secondName: z.string().min(2, "الاسم الثاني مطلوب ويجب أن لا يقل عن حرفين"),
  thirdName: z.string().optional(),
  lastName: z.string().min(2, "اسم العائلة مطلوب ويجب أن لا يقل عن حرفين"),
  gender: z.enum(["M", "F"], {
    required_error: "الجنس مطلوب",
    invalid_type_error: "الجنس غير صحيح",
  }),
  dateOfBirth: z
    .date({
      required_error: "تاريخ الميلاد مطلوب", // ✅ This will trigger if the value is completely missing
    })
    .nullable()
    .refine((date) => date !== null, {
      message: "تاريخ الميلاد مطلوب", // ✅ This will trigger if it's null
    }),

  nationalityId: z.number().positive("الجنسية مطلوبة"),
  personalImage: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true; // Optional file is allowed
      if (file instanceof File) {
        const validTypes = ["image/jpeg", "image/png"];
        return validTypes.includes(file.type);
      }
      return false;
    }, "الصورة الشخصية يجب أن تكون بصيغة JPEG أو PNG"),
});

// Infer Type
export type TPersonalInfoForm = z.infer<typeof personalInfoSchema>;

// Default Values
export const personalInfoDefaultValues: TPersonalInfoForm = {
  nationalNo: "",
  firstName: "",
  secondName: "",
  thirdName: "",
  lastName: "",
  gender: "M",
  dateOfBirth: null,
  nationalityId: 0,
  personalImage: undefined,
};
