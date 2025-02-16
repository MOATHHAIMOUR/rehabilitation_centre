import { z } from "zod";

export const applicantEducationInfoSchema = z.object({
  minstryEducationTypeId: z.number().min(1),
  minstryEducationTLevelId: z.number().min(1),
  notes: z.string(),
});

export type TApplicantEducationInfoSchema = z.infer<
  typeof applicantEducationInfoSchema
>;

export const applicantEducationInfoDefaultValues: TApplicantEducationInfoSchema =
  {
    minstryEducationTypeId: 0,
    minstryEducationTLevelId: 0,
    notes: "",
  };
