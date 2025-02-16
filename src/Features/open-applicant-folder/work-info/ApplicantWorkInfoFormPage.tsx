import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import Box from "../../../components/ui/Box";
import {
  applicantWorkSchema,
  applicantWorkSchemaDefaultValues,
  TApplicantWorkSchema,
} from "./types/applicantWorkSchema";
import { Form } from "../form/components/Form";
import WorkInfo from "./components/WorkInfo";

const WorkInfoFormPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantWorkSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to next step
  }

  //   const onError = (errors: any) => {
  //     console.error("❌ Validation Errors:", errors);
  //   };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantWorkSchemaDefaultValues}
      schema={applicantWorkSchema}
      //   onError={onError}
    >
      <FormContent />
    </Form>
  );
};

export default WorkInfoFormPage;

const FormContent = () => {
  /* ────────────── REACT-HOOK-FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantWorkSchema>();

  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
