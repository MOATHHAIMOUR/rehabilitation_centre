import {
  INewResearchType,
  useAddNewResearchTypeMutation,
} from "../../../store/services/researchTypeSliceApi";
import { toast } from "react-toastify";

const useAddResearchType = () => {
  const [addNewResearchType, { isLoading }] = useAddNewResearchTypeMutation();

  const addResearchType = async (data: INewResearchType) => {
    const toastId = toast.loading("جاري الإضافة...");

    try {
      await addNewResearchType({
        researchTypeNameAr: data.researchTypeNameAr.trim(),
        researchTypeNameEn: data.researchTypeNameEn.trim(),
      }).unwrap();
      toast.update(toastId, {
        render: "تم إضافة نوع البحث بنجاح",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
    } catch {
      toast.update(toastId, {
        render: "فشلت العملية، يرجى المحاولة مرة أخرى.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        position: "top-right",
        hideProgressBar: true,
      });
    }
  };

  return { addResearchType, isLoading };
};

export default useAddResearchType;
