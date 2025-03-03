import { useCallback } from "react";
import { useLazyGetAllResearchCategoriesByResearchTypeIdQuery } from "../../../store/services/researchCategoryApiSlice";
import { toast } from "react-toastify";

export const useResearchCategories = () => {
  const [fetchResearchCategories, { isLoading }] =
    useLazyGetAllResearchCategoriesByResearchTypeIdQuery();

  const getResearchCategories = useCallback(
    async (researchTypeId: number) => {
      try {
        const result = await fetchResearchCategories(researchTypeId).unwrap();
        return result;
      } catch (error) {
        toast.error("Failed to fetch research categories. Please try again.");
        console.error("Failed to fetch research categories", error);
        throw error;
      }
    },
    [fetchResearchCategories]
  );

  return {
    getResearchCategories,
    isLoading,
  };
};
