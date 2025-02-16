import { z } from "zod";

export const applicantComplaintInfoSchema = z.object({
  ComplaintIds: z.array(z.number()),
  notes: z.string(),
});

export type TApplicantComplaintInfoSchema = z.infer<
  typeof applicantComplaintInfoSchema
>;

export const applicantComplaintInfoDefaultValues: TApplicantComplaintInfoSchema =
  {
    ComplaintIds: [],
    notes: "",
  };
