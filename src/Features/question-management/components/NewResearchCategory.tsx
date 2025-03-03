import { useForm, SubmitHandler } from "react-hook-form";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import Button from "../../../components/ui/Button";
import {
  INewResearchCategory,
  IResultNewResearchCategory,
} from "../../../store/services/researchCategoryApiSlice";
import useAddResearchCategory from "../hooks/useAddResearchCategory";
import { motion } from "framer-motion";
import { TAddNewRsearchCategorySchema } from "../types/AddNewRsearchCategorySchema";

interface IPops {
  onCancel: () => void;
  onSucsessAddNew: (
    result: IResultNewResearchCategory,
    selectedParentResearchCategoryId: number | null
  ) => void;
  selectedResearchTypeId: number;
  selectedParentResearchCategoryId: number | null;
}

const NewResearchCategoryForm = ({
  onCancel,
  onSucsessAddNew,
  selectedResearchTypeId,
  selectedParentResearchCategoryId,
}: IPops) => {
  /* ────────────── FORM SETUP ────────────── */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddNewRsearchCategorySchema>();

  const { addResearchCategory, isLoading } = useAddResearchCategory();

  // Memoize the flattened categories to avoid unnecessary recalculations
  // const flatenResearchCategories =
  //   flattenResearchCategories(researchCategories);

  /* ────────────── HANDLERS ────────────── */

  const onSubmit: SubmitHandler<TAddNewRsearchCategorySchema> = async (
    data
  ) => {
    const addNewResearchCategorydata: INewResearchCategory = {
      nameAr: data.nameAr.trim(),
      nameEn: data.nameEn.trim(),
      parentResearchCategoryId: selectedParentResearchCategoryId,
      researchTypeId: selectedResearchTypeId,
    };

    const res = await addResearchCategory(addNewResearchCategorydata);
    if (res.statusCode === 200)
      onSucsessAddNew(res.data, selectedParentResearchCategoryId);
  };

  // const isLinked = useWatch({ control, name: "isLinked" });

  console.log("preane");
  console.log(selectedParentResearchCategoryId);
  return (
    <form
      className="h-full mt-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Arabic Name */}
      <CustomTextInput
        {...register("nameAr")}
        name="nameAr"
        isRequired={true}
        label="اسم التصنيف باللغة العربية"
        error={errors.nameAr?.message}
      />

      {/* English Name */}
      <CustomTextInput
        {...register("nameEn")}
        name="nameEn"
        isRequired={true}
        label="اسم التصنيف باللغة الإنجليزية"
        error={errors.nameEn?.message}
      />

      {
        // <>
        //   {/* Link to Existing Category Toggle */}
        //   <motion.label
        //     {...opacityAnimationProps}
        //     className="my-2 flex gap-3 items-center cursor-pointer text-lg font-semibold"
        //   >
        //     <input
        //       type="checkbox"
        //       {...register("isLinked")}
        //       className="hidden"
        //     />
        //     {isLinked ? (
        //       <CiCircleMinus size={32} />
        //     ) : (
        //       <CiCirclePlus size={32} />
        //     )}
        //     <span>
        //       {!isLinked
        //         ? "ربط التصنيف الجديد بتصنيف مسجل في النظام"
        //         : "إلغاء الربط بتصنيف مسجل"}
        //     </span>
        //   </motion.label>
        //   {/* Select Existing Category Dropdown with Optimized Animation */}
        //   <AnimatePresence>
        //     {isLinked && (
        //       <motion.div
        //         key="select-menu"
        //         initial={{ opacity: 0, y: -10, height: 0 }}
        //         animate={{
        //           opacity: 1,
        //           y: 0,
        //           height: "auto",
        //           transition: { duration: 0.3, ease: "easeOut" },
        //         }}
        //         exit={{
        //           opacity: 0,
        //           y: -10,
        //           height: 0,
        //           transition: { duration: 0.2, ease: "easeIn" },
        //         }}
        //         className="overflow-hidden"
        //       >
        //         <ControlledSelectMenu
        //           control={control}
        //           name="parentResearchCategoryId"
        //           options={flatenResearchCategories.map((p) => ({
        //             label: p.nameAr,
        //             value: p.researchCategoryId,
        //           }))}
        //           label="اختر تصنيفًا مسجلًا في النظام"
        //         />
        //       </motion.div>
        //     )}
        //   </AnimatePresence>
        // </>
      }

      {/* Buttons */}
      <motion.div layout className="flex gap-4 mt-8">
        <Button
          onClick={onCancel}
          type="button"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          إغلاق
        </Button>
        <Button
          isLoading={isLoading}
          type="submit"
          className="w-full bg-bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          تأكيد
        </Button>
      </motion.div>
    </form>
  );
};

export default NewResearchCategoryForm;
