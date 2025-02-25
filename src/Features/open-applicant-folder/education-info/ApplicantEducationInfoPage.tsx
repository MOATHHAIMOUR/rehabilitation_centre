import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/components/Form";
import {
  applicantEducationInfoDefaultValues,
  applicantEducationInfoSchema,
  TApplicantEducationInfoSchema,
} from "./types/applicantClassificationInfoSchema";
import ApplicantEducationInfoFormContent from "./components/ApplicantEducationInfoFormContent";

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
      isMultiForm={true}
      // onError={onError}
    >
      <ApplicantEducationInfoFormContent />
    </Form>
  );
};

export default EducationInfoFormPage;
