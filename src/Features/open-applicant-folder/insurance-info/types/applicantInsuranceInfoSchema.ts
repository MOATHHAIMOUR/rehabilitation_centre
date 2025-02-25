import { z } from "zod";

export const applicantInsuranceInfoSchema = z.object({
  doseHaveInsurance: z.number(),
  insuranceTypeId: z.number(),
  insuranceLevelId: z.number(),
  notes: z.string(),
});

export type TApplicantInsuranceInfoSchema = z.infer<
  typeof applicantInsuranceInfoSchema
>;

export const applicantInsuranceInfoSchemaDefaultValues: TApplicantInsuranceInfoSchema =
  {
    doseHaveInsurance: 0,
    insuranceTypeId: 0,
    insuranceLevelId: 0,
    notes: "",
  };
