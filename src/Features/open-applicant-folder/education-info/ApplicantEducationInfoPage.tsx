import { useNavigate } from "react-router-dom";
import { Form } from "../form/components/Form";
import { useFormContext } from "react-hook-form";
import {
  useGetMinistryEducationsQuery,
  useLazyGetMinistryEducationLevelsByIdQuery,
} from "../../../store/ministryEducationApi";
import Box from "../../../components/ui/Box";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import {
  applicantEducationInfoDefaultValues,
  applicantEducationInfoSchema,
  TApplicantEducationInfoSchema,
} from "./types/applicantClassificationInfoSchema";

const EducationInfoFormPage = () => {
  /* ────────────── STATE ────────────── */
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantEducationInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

  // const onError = (errors: any) => {
  //   console.error("❌ Validation Errors:", errors);
  // };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantEducationInfoDefaultValues}
      schema={applicantEducationInfoSchema}
      // onError={onError}
    >
      <FormContent />
    </Form>
  );
};

export default EducationInfoFormPage;

const FormContent = () => {
  /* ────────────── STORE ────────────── */
  const { data: MinistryEducationsResponse } = useGetMinistryEducationsQuery();
  const ministryEducations =
    MinistryEducationsResponse?.data.map((m) => ({
      label: m.nameAr,
      value: m.ministryEducationId,
    })) || [];

  const [
    ministryEducationLevelTrigger,
    { data: MinistryEducationLevelsResponse },
  ] = useLazyGetMinistryEducationLevelsByIdQuery();

  const ministryEducationLevels =
    MinistryEducationLevelsResponse?.data?.map((m) => ({
      label: m.levelAr,
      value: m.ministryEducationLevelId,
    })) || [];

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantEducationInfoSchema>();

  /* ────────────── HANDLERS  ────────────── */
  function handleMinistryChange(val: number | number[] | null) {
    if (val && !Array.isArray(val)) {
      ministryEducationLevelTrigger(val);
    }
  }

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* نوع الوزارة */}
      <ControlledSelectMenu
        control={control}
        name="minstryEducationTypeId"
        label="نوع الوزارة"
        options={ministryEducations}
        isRequired={true}
        externalOnChange={handleMinistryChange}
        error={errors.minstryEducationTypeId}
      />

      {/* المستوى التعليمي */}
      <ControlledSelectMenu
        control={control}
        name="minstryEducationTLevelId"
        label="المستوى التعليمي"
        options={ministryEducationLevels}
        error={errors.minstryEducationTLevelId}
      />

      {/* ملاحظات */}
      <CustomTextArea
        {...register("notes")}
        label="ملاحظات"
        name="notes"
        error={errors.notes?.message}
      />
    </Box>
  );
};
