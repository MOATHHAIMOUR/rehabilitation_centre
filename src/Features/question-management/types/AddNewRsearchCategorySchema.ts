import { z } from "zod";

// ✅ Discriminated Union for Dependent Question
// const linkResearchTypeCategoryWithAnotherResearchType = z.discriminatedUnion(
//   "isLinked",
//   [
//     z.object({
//       isLinked: z.literal(true),
//       parentResearchCategoryId: z.number().min(1, "مطلوب"),
//     }),
//     z.object({
//       isLinked: z.literal(false),
//       parentResearchCategoryId: z.null().optional(),
//     }),
//   ]
// );

// ✅ Main Schema
const AddNewRsearchCategorySchema = z.object({
  nameAr: z.string().min(1, "الأسم مطلوب"),
  nameEn: z.string().min(1, "الأسم مطلوب"),
  parentResearchCategoryId: z.number().nullable().optional(),
  researchTypeId: z.number().min(1, "مطلوب"),
});

type TAddNewRsearchCategorySchema = z.infer<typeof AddNewRsearchCategorySchema>;

export { AddNewRsearchCategorySchema, type TAddNewRsearchCategorySchema };
