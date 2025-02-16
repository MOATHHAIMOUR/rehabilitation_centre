import { useNavigate } from "react-router-dom";
import { Form } from "../form/components/Form";
import { useFormContext } from "react-hook-form";
import Box from "../../../components/ui/Box";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import {
  applicantRelativeInfoSchema,
  applicantRelativeInfoSchemaDefaultValues,
  TApplicantRelativeInfoSchema,
} from "./types/applicantRelativeInfoSchema";

/* ────────────── ✅ MAIN FORM COMPONENT ────────────── */
const ApplicantRelativeInfoPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantRelativeInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

  //   const onError = (errors: any) => {
  //     console.error("❌ Validation Errors:", errors);
  //   };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantRelativeInfoSchemaDefaultValues}
      schema={applicantRelativeInfoSchema}
      //   onError={onError}
    >
      <FormContent />
    </Form>
  );
};

export default ApplicantRelativeInfoPage;

/* ────────────── ✅ FORM CONTENT COMPONENT ────────────── */
const FormContent = () => {
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
