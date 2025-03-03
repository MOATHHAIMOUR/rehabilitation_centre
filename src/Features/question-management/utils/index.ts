import {
  IResearchCategory,
  IResultNewResearchCategory,
} from "../../../store/services/researchCategoryApiSlice";
import { convertValToUrlType } from "../../first-research/utils";
import { EnumAnswerType } from "../enums";

export const isAnswerTypeMenu = (type: EnumAnswerType | null) =>
  type === EnumAnswerType.MultiSelecetMenuWithMultibleAnswer ||
  type === EnumAnswerType.SelecetMenuWithOneAnswer;

export function findResearchCategoryByResearchCategoryId(
  tree: IResearchCategory[],
  researchCategoryId: number
): IResearchCategory | null {
  for (const category of tree) {
    if (category.researchCategoryId === researchCategoryId) {
      return category;
    }

    const found = findResearchCategoryByResearchCategoryId(
      category.childrenResearchCategories,
      researchCategoryId
    );
    if (found) {
      return found;
    }
  }

  return null;
}

export function getFisrtResearchCategoryIdInTree(
  tree: IResearchCategory[]
): number {
  for (const category of tree) {
    if (category.childrenResearchCategories.length === 0) {
      return category.researchCategoryId;
    }

    const found = getFisrtResearchCategoryIdInTree(
      category.childrenResearchCategories
    );
    if (found) {
      return found;
    }
  }

  return -1;
}

export function findResearchCategoryByResearchCategoryNamePath(
  tree: IResearchCategory[],
  researchCategoryNamePath: string
): boolean {
  for (const category of tree) {
    if (convertValToUrlType(category.nameEn) === researchCategoryNamePath) {
      return true;
    }

    const found = findResearchCategoryByResearchCategoryNamePath(
      category.childrenResearchCategories,
      researchCategoryNamePath
    );
    if (found) {
      return found;
    }
  }

  return false;
}

export function flattenResearchCategories(
  tree: IResearchCategory[]
): { researchCategoryId: number; nameAr: string }[] {
  const result: { researchCategoryId: number; nameAr: string }[] = [];

  function traverse(categories: IResearchCategory[]) {
    for (const category of categories) {
      result.push({
        researchCategoryId: category.researchCategoryId,
        nameAr: category.nameAr,
      });

      if (category.childrenResearchCategories.length > 0) {
        traverse(category.childrenResearchCategories);
      }
    }
  }

  traverse(tree);
  return result;
}

export function addChildToParent(
  tree: IResearchCategory[],
  parentId: number | null,
  newChild: IResultNewResearchCategory
): IResearchCategory[] {
  const convertedChild: IResearchCategory = {
    researchCategoryId: newChild.researchCategoryID,
    nameAr: newChild.nameAr,
    nameEn: newChild.nameEn,
    parentStageId: newChild.parentResearchCategoryId ?? undefined,
    researchTypeId: newChild.researchTypeId,
    childrenResearchCategories: [], // New children start empty
  };

  if (parentId === null) return [...tree, convertedChild];

  return tree.map((node) => {
    if (node.researchCategoryId === parentId) {
      return {
        ...node,
        childrenResearchCategories: [
          ...(node.childrenResearchCategories ?? []),
          convertedChild, // ✅ Now correct type
        ],
      };
    }

    if (
      node.childrenResearchCategories &&
      node.childrenResearchCategories.length > 0
    ) {
      return {
        ...node,
        childrenResearchCategories: addChildToParent(
          node.childrenResearchCategories,
          parentId,
          newChild
        ),
      };
    }

    return node;
  });
}
