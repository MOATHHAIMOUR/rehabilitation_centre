import { useNavigate } from "react-router-dom";
import {
  applicantWorkSchema,
  applicantWorkSchemaDefaultValues,
  TApplicantWorkSchema,
} from "./types/applicantWorkSchema";
import { Form } from "../../../components/components/Form";
import ApplicantWorkInfoFormContent from "./components/ApplicantWorkInfoFormContent";

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
      isMultiForm={true}
      //   onError={onError}
    >
      <ApplicantWorkInfoFormContent />
    </Form>
  );
};

export default WorkInfoFormPage;
