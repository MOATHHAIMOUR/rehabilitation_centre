import { IStageCategory } from "../../../store/services/stageCategoryApiSlice";
import { IFirstResearshFormsData } from "../store/FirstResearshSlice";

export function BuildMainDaynamicResearshValues(
  data: IStageCategory[],
  name: string,
  stageCategoriesIdsPaths: number[],
  dataResearchVals: IFirstResearshFormsData[],
  dataResearchValsSize: number
): IFirstResearshFormsData[] {
  for (let i = 0; i < data.length; i++) {
    const stagecategory = data[i];

    stageCategoriesIdsPaths.push(stagecategory.stageCategoryId);

    if (stagecategory.childCategories.length === 0) {
      dataResearchVals.push({
        key:
          dataResearchVals.length > 0
            ? dataResearchVals[dataResearchVals.length - 1].key + 1
            : 0,
        IsFirstPath: i == 0,
        IsLastPath: dataResearchVals.length + 1 === dataResearchValsSize,
        name: stagecategory.nameEn,
        path: `http://localhost:5174/first-researsh/${
          name === "" ? stagecategory.nameEn : name
        }`,
        stageCategoryIdsPath: [...stageCategoriesIdsPaths],
      });
    }
    BuildMainDaynamicResearshValues(
      stagecategory.childCategories,
      name + stagecategory.nameEn + "-",
      stageCategoriesIdsPaths,
      dataResearchVals,
      dataResearchValsSize
    );

    stageCategoriesIdsPaths.pop();
  }

  return dataResearchVals;
}
