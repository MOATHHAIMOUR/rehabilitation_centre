import { useForm, SubmitHandler } from "react-hook-form";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { INewStageCategory } from "../interfaces";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";
import { useAddNewStageCategoryMutation } from "../store/stageCategoryApiSlice";

interface IPops {
  onCancel: () => void;
  stagId: number;
  parentStageCategoryId: number | null;
}
const NewStageCategoryForm = ({
  onCancel,
  stagId,
  parentStageCategoryId,
}: IPops) => {
  const toastId = "1";

  console.log("stagId: " + stagId);
  console.log("parentStageCategoryId: " + parentStageCategoryId);

  /* ────────────── STATE  ────────────── */
  const { register, handleSubmit } = useForm<INewStageCategory>();

  const [addNewStageCategoryTrigger, { isLoading }] =
    useAddNewStageCategoryMutation();
  /* ────────────── Handlers  ────────────── */

  const onSubmit: SubmitHandler<INewStageCategory> = async (data) => {
    console.log("parentStageCategoryId2: " + parentStageCategoryId);
    const addNewStageCategorydata: INewStageCategory = {
      nameAr: data.nameAr,
      parentStageCategoryId: parentStageCategoryId,
      stageId: stagId,
    };

    try {
      await addNewStageCategoryTrigger(addNewStageCategorydata).unwrap(); // Unwrap the promise to properly track state
      toast.success("تم إضافة الصنف بنجاح", {
        toastId,
        hideProgressBar: true,
        autoClose: 3000,
        position: "top-right",
      });
    } catch {
      toast.error("Operation Failed. Please try again.");
    }
  };

  return (
    <form
      className="h-[100%]  mt-10 flex flex-col justify-between gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Work Sector Type */}
      <div className="mb-4 flex flex-col gap-4">
        <CustomTextInput
          {...register("nameAr")}
          name="nameAr"
          isRequired={true}
          label="إسم الصنف"
        />

        {/* <CustomTextArea
          {...register("")}
          name="nameAr"
          isRequired={true}
          label="الوصف"
        />
        {errors.nameAr && (
          <p className="text-red-500 text-sm">{errors.nameAr?.message}</p>
        )} */}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          type="button"
          className="mt-4 w-full bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          إغلاق
        </button>
        {/* Submit Button */}
        <Button
          isLoading={isLoading}
          type="submit"
          className="mt-4 w-full bg-bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          تأكيد
        </Button>
      </div>
    </form>
  );
};

export default NewStageCategoryForm;

// externalOnChange={(val) => {
//     if (val && !Array.isArray(val)) {
//       if (isAnswerTypeMenu(val))
//         appendChoice({
//           id: Date.now(),
//           value: "",
//         });
//     }
//   }}
