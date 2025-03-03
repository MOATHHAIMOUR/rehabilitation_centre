import { useForm, SubmitHandler } from "react-hook-form";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import Button from "../../../components/ui/Button";
import { INewResearchType } from "../../../store/services/researchTypeSliceApi";
import useAddResearchType from "../hooks/useAddResearchType";

interface IPops {
  onCancel: () => void;
}
const NewResearchTypeForm = ({ onCancel }: IPops) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewResearchType>({});

  const { addResearchType, isLoading } = useAddResearchType();

  const onSubmit: SubmitHandler<INewResearchType> = async (data) => {
    addResearchType(data);
  };

  return (
    <form
      className="mt-10 flex flex-col justify-between gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Work Sector Type */}
      <div className="mb-4">
        <CustomTextInput
          {...register("researchTypeNameAr")}
          name="stageNameAr"
          isRequired={true}
          label="  إسم نوع البحث / الدراسة باللغة العربية"
        />
        {errors.researchTypeNameAr && (
          <p className="text-red-500 text-sm">
            {errors.researchTypeNameAr?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <CustomTextInput
          {...register("researchTypeNameEn")}
          name="stageNameAr"
          isRequired={true}
          label="إسم نوع البحث / الدراسة باللغة الإنجليزية"
        />
        {errors.researchTypeNameEn && (
          <p className="text-red-500 text-sm">
            {errors.researchTypeNameAr?.message}
          </p>
        )}
      </div>

      {/*  Field */}
      <div className="mb-4">
        {/* <CustomTextArea
          {...register("stageDescriptionAr")}
          name="stageDescriptionAr"
          isRequired={true}
          label="الوصف"
        />
        {errors.stageDescriptionAr && (
          <p className="text-red-500 text-sm">
            {errors.stageDescriptionAr?.message}
          </p>
        )} */}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button
          onClick={onCancel}
          type="button"
          className="mt-4 w-full bg-red-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          إغلاق
        </Button>
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

export default NewResearchTypeForm;
