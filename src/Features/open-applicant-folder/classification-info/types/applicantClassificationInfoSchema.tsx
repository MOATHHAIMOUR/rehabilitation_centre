import { z } from "zod";

export const applicantClassificationInfoSchema = z.object({
  applicantClassificationInfoId: z.number().min(1),
  notes: z.string(),
});

export type TApplicantClassificationInfoSchema = z.infer<
  typeof applicantClassificationInfoSchema
>;

export const defaultValues: TApplicantClassificationInfoSchema = {
  applicantClassificationInfoId: 0,
  notes: "",
};
