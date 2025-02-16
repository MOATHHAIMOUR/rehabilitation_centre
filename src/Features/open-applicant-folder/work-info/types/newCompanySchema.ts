import { z } from "zod";

export const newCompanySchema = z.object({
  workSectorType: z.number().min(1),
  workFieldId: z.number().min(1),
  companeyName: z.string().min(1),
});

export type TNewCompanSchema = z.infer<typeof newCompanySchema>;

export const newCompanySchemaDefaultValues: TNewCompanSchema = {
  companeyName: "",
  workFieldId: 0,
  workSectorType: 0,
};
