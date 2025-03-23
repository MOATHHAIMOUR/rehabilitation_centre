import { z } from "zod";

export const contactInfoSchema = z.object({
  contactType: z.number({
    required_error: "نوع جهة الاتصال مطلوب",
  }),
  contactValue: z.string().min(3, "قيمة جهة الاتصال مطلوبة"),
  contactName: z.string().optional(),
  isPrimary: z.boolean(),
});

export type TContactInfoForm = z.infer<typeof contactInfoSchema>;

export const contactInfoDefaultValues: TContactInfoForm = {
  contactType: 0, // Default to first contact type (e.g., Mobile)
  contactValue: "",
  contactName: "",
  isPrimary: false,
};
