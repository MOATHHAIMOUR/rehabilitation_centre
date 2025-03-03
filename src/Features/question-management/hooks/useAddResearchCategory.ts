import { toast } from "react-toastify";
import {
  INewResearchCategory,
  IResultNewResearchCategory,
  useAddNewResearchCategoryMutation,
} from "../../../store/services/researchCategoryApiSlice";
import { IGenericApiResponse } from "../../../interfaces";

const useAddResearchCategory = () => {
  const [addNewStageCategoryTrigger, { isLoading }] =
    useAddNewResearchCategoryMutation();
  const addResearchCategory = async (
    addNewStageCategoryData: INewResearchCategory
  ): Promise<IGenericApiResponse<IResultNewResearchCategory>> => {
    const toastId = toast.loading("جاري الإضافة...");
    let res: IGenericApiResponse<IResultNewResearchCategory> = null!;
    try {
      res = await addNewStageCategoryTrigger(addNewStageCategoryData).unwrap();
      toast.update(toastId, {
        render: "تم إضافة الصنف بنجاح",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
      return res;
    } catch (error) {
      console.error("Error adding research category:", error);
      toast.update(toastId, {
        render: "حدث خطأ أثناء الإضافة",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
      return res;
    }
  };

  return { addResearchCategory, isLoading };
};

export default useAddResearchCategory;
