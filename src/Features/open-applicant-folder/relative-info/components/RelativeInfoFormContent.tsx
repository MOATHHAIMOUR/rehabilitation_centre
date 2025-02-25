import { useFormContext } from "react-hook-form";
import { TApplicantRelativeInfoSchema } from "../types/applicantRelativeInfoSchema";
import Box from "../../../../components/ui/Box";
import ControlledSelectMenu from "../../../../components/ControlledSelectMenu";
import CustomTextInput from "../../../../components/ui/CustomTextInput";

const RelativeInfoFormContent = () => {
  /* ────────────── REACT HOOK FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantRelativeInfoSchema>();

  return (
    <Box className="grid grid-cols-1 gap-4">
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
