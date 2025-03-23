import { useFormContext } from "react-hook-form";
import { TApplicantRelativeInfoSchema } from "../types/applicantRelativeInfoSchema";
import Box from "../../../../components/ui/Box";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { ControlledSelectMenu } from "../../../../components/ControlledSelectMenu";

const RelativeInfoFormContent = () => {
  /* ────────────── REACT HOOK FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantRelativeInfoSchema>();

  return (
    <Box className="grid grid-cols-1 gap-4">
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          المعلومات الأقارب
        </h2>
      </div>
      {/* صلة القريب */}
      <ControlledSelectMenu
        control={control}
        options={[]} // Add options dynamically if needed
        label="صلة القريب"
        name="relativeTypeId"
        error={errors.relativeTypeId}
      />

      {/* اسم القريب */}
      <CustomTextInput
        {...register("relativeName")}
        label="اسم القريب"
        name="applicantRelativeInfo.Name"
        error={errors.relativeName?.message}
      />

      {/* رقم الجوال */}
      <CustomTextInput
        {...register("relativePhone")}
        label="رقم الجوال"
        name="applicantRelativeInfo.phone"
        error={errors.relativePhone?.message}
      />
    </Box>
  );
};

export default RelativeInfoFormContent;
