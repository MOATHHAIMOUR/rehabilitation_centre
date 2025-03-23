import { z } from "zod";

const dateRangeSchema = z
  .object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.endDate == null || data.startDate == null) {
      ctx.addIssue({
        path: ["endDate", "startDate"],
        message: "تاريخ بداية العمل و نهايته مطلوبين",
        code: z.ZodIssueCode.custom,
      });
      return;
    }
    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: "تاريخ النهاية يجب أن يكون أكبر من تاريخ البداية",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const jobInfoSchema = z
  .object({
    departmentJobTitleId: z.number({
      required_error: "الوظيفة مطلوبة",
    }),
    contractType: z.number({
      required_error: "نوع العقد مطلوب",
    }),
    supervisorId: z.number({
      required_error: "المشرف مطلوب",
    }),
  })
  .and(dateRangeSchema);

export type TJobInfoForm = z.infer<typeof jobInfoSchema>;

export const jobInfoDefaultValues: TJobInfoForm = {
  departmentJobTitleId: 0,
  contractType: 0,
  supervisorId: 0,
  startDate: null,
  endDate: null,
};
