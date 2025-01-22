import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import WorkInfo from "./WorkInfo";
import { IOpenApplicantFolder } from "../../interface";
import Box from "../../../../components/ui/Box";

interface IProps {
  control: Control<IOpenApplicantFolder>;
  register: UseFormRegister<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
}

const ApplicantWorkInfo = ({ control, errors, register }: IProps) => {
  return (
    <Box className="grid grid-cols-1 gap-4">
      {/* Work Info */}
      <WorkInfo
        control={control}
        register={register}
        error={[
          errors.applicatnWorkInfo?.workPhone,
          errors.applicatnWorkInfo?.companeyId,
          errors.applicatnWorkInfo?.workSectorType,
          errors.applicatnWorkInfo?.workFieldId,
        ]}
        name={[
          "applicatnWorkInfo.workPhone",
          "applicatnWorkInfo.companeyId",
          "applicatnWorkInfo.workSectorType",
          "applicatnWorkInfo.workFieldId",
        ]}
      />
    </Box>
  );
};

export default ApplicantWorkInfo;
