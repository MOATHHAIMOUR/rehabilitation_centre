import { IResearchCategory } from "../../../store/services/researchCategoryApiSlice";

export function BuildResearshCategoriesIds(
  data: IResearchCategory[],
  currentResearchCategoryId: number,
  stageCategoriesIdsPaths: number[]
): number[] {
  for (let i = 0; i < data.length; i++) {
    const researchCategory = data[i];
    stageCategoriesIdsPaths.push(researchCategory.researchCategoryId);

    if (researchCategory.researchCategoryId === currentResearchCategoryId)
      return [...stageCategoriesIdsPaths];

    if (researchCategory.childrenResearchCategories.length > 0) {
      const result = BuildResearshCategoriesIds(
        researchCategory.childrenResearchCategories,
        currentResearchCategoryId,
        stageCategoriesIdsPaths
      );
      if (result.length > 0) return result;
    }
    stageCategoriesIdsPaths.pop();
  }

  return [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cloneFormData = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
