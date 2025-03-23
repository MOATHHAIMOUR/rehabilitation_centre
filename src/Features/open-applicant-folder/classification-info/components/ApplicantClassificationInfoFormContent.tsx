import { useFormContext } from "react-hook-form";
import Box from "../../../../components/ui/Box";
import { TApplicantClassificationInfoSchema } from "../types/applicantClassificationInfoSchema";
import { useGetApplicantClassficationTypesQuery } from "../../../../store/services/applicantClassificationApi";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import { ControlledSelectMenu } from "../../../../components/ControlledSelectMenu";

const ApplicantClassificationInfoFormContent = () => {
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
      {/* 🟢 القسم 1: المعلومات الشخصية الأساسية */}
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">تصنيف المتقدم</h2>
      </div>

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

export default ApplicantClassificationInfoFormContent;
