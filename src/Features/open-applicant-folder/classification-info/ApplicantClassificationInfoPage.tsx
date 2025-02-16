import { useFormContext } from "react-hook-form";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import Box from "../../../components/ui/Box";
import { useGetApplicantClassficationTypesQuery } from "../../../store/applicantClassificationApi";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import { TApplicantClassificationInfoSchema } from "./types/applicantClassificationInfoSchema";

const ApplicantClassificationInfo = () => {
  /* ────────────── STORE  ────────────── */
  const { data: ApplicantClassficationTypesResponse } =
    useGetApplicantClassficationTypesQuery();
  const applicantClassficationTypes =
    ApplicantClassficationTypesResponse?.data.map((a) => {
      return { label: a.nameAr, value: a.applicantClassificationTypeId };
    });

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TApplicantClassificationInfoSchema>(); // ✅ Now inside `FormProvider`

  return (
    <Box className="flex  flex-col gap-8">
      <ControlledSelectMenu
        control={control}
        name="applicantClassificationInfoId"
        label="تصنيف المراجع"
        options={applicantClassficationTypes ?? []}
        isRequired={true}
        error={errors.applicantClassificationInfoId}
      />

      <CustomTextArea {...register("notes")} label="ملاحظات" name="notes" />
    </Box>
  );
};

export default ApplicantClassificationInfo;
