import { useFormContext } from "react-hook-form";
import { TApplicantWorkSchema } from "../types/applicantWorkSchema";
import Box from "../../../../components/ui/Box";
import WorkInfo from "./WorkInfo";

const ApplicantWorkInfoFormContent = () => {
  /* ────────────── REACT-HOOK-FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantWorkSchema>();

  return (
    <Box>
      <WorkInfo
        control={control}
        companyIdName="companyId"
        sectorIdName="sectorId"
        workPhoneName="workPhone"
        industryFieldName="industryField"
        errors={errors}
        register={register}
      />
    </Box>
  );
};

export default ApplicantWorkInfoFormContent;
