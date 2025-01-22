import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import ControlledSelectMenu from "../../../../components/ControlledSelectMenu";
import { IOpenApplicantFolder } from "../../interface";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import Box from "../../../../components/ui/Box";

interface IProps {
  control: Control<IOpenApplicantFolder>;
  register: UseFormRegister<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
}
const ApplicantRelativeInfo = ({ control, errors, register }: IProps) => {
  return (
    <Box className="grid grid-cols-1 gap-4">
      <ControlledSelectMenu
        control={control}
        options={[]}
        label="صلة القريب"
        name="applicantRelativeInfo.Name"
        error={errors.applicantRelativeInfo?.RelativeTypeId}
      />
      <CustomTextInput
        {...register("applicantRelativeInfo.Name")}
        label="اسم القريب"
        name="applicantRelativeInfo.Name"
        error={errors.applicantRelativeInfo?.Name?.message}
      />
      <CustomTextInput
        {...register("applicantRelativeInfo.phone")}
        label="اسم القريب"
        name="applicantRelativeInfo.phone"
        error={errors.applicantRelativeInfo?.phone?.message}
      />
    </Box>
  );
};

export default ApplicantRelativeInfo;
