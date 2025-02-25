import { useForm, SubmitHandler } from "react-hook-form";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { INewStageType } from "../interfaces";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import { useAddNewStageMutation } from "../../../store/services/stageSliceApi";
import { toast } from "react-toastify";
import Button from "../../../components/ui/Button";

interface IPops {
  onCancel: () => void;
}
const NewStageTypeForm = ({ onCancel }: IPops) => {
  const toastId = "addNewStageSuccess";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewStageType>({});

  const [addNewStageType, { isLoading }] = useAddNewStageMutation();

  const onSubmit: SubmitHandler<INewStageType> = async (data) => {
    try {
      await addNewStageType(data).unwrap(); // Unwrap the promise to properly track state
      toast.success("تم إضافة نوع البحث بنجاح", {
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
      className="mt-10 flex flex-col justify-between gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Work Sector Type */}
      <div className="mb-4">
        <CustomTextInput
          {...register("stageNameAr")}
          name="stageNameAr"
          isRequired={true}
          label="إسم نوع البحث / الدراسة"
        />
        {errors.stageNameAr && (
          <p className="text-red-500 text-sm">{errors.stageNameAr?.message}</p>
        )}
      </div>

      {/* Work Field */}
      <div className="mb-4">
        <CustomTextArea
          {...register("stageDescriptionAr")}
          name="stageDescriptionAr"
          isRequired={true}
          label="الوصف"
        />
        {errors.stageDescriptionAr && (
          <p className="text-red-500 text-sm">
            {errors.stageDescriptionAr?.message}
          </p>
        )}
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

export default NewStageTypeForm;
