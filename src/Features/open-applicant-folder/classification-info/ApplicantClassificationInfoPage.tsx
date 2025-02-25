import {
  applicantClassificationInfoSchema,
  applicantClassificationInfoSchemaDefaultValues,
  TApplicantClassificationInfoSchema,
} from "./types/applicantClassificationInfoSchema";
import ApplicantClassificationInfoFormContent from "./components/ApplicantClassificationInfoFormContent";
import { Form } from "../../../components/components/Form";
import { useNavigate } from "react-router-dom";

const ApplicantClassificationInfoPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantClassificationInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

  // const onError = (errors: any) => {
  //   console.error("❌ Validation Errors:", errors);
  // };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantClassificationInfoSchemaDefaultValues}
      schema={applicantClassificationInfoSchema}
      isMultiForm={true}
    >
      <ApplicantClassificationInfoFormContent />
    </Form>
  );
};

export default ApplicantClassificationInfoPage;
