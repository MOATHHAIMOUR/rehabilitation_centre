import { z } from "zod";

export const applicantEducationInfoSchema = z.object({
  applicantEducationInfo: z.number().min(1),
  notes: z.string(),
});

export type TApplicantEducationInfoSchema = z.infer<
  typeof applicantEducationInfoSchema
>;

export const applicantEducationInfoDefaultValues: TApplicantEducationInfoSchema =
  {
    applicantEducationInfo: 0,
    notes: "",
  };
