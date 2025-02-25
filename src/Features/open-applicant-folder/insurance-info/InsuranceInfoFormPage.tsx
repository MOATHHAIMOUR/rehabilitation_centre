import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/components/Form";
import {
  applicantInsuranceInfoSchema,
  applicantInsuranceInfoSchemaDefaultValues,
  TApplicantInsuranceInfoSchema,
} from "./types/applicantInsuranceInfoSchema";
import InsuranceInfoFormContent from "./components/InsuranceInfoFormContent";

/* ────────────── ✅ MAIN FORM COMPONENT ────────────── */
const ApplicantInsuranceInfoFormPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantInsuranceInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

  //   const onError = (errors: any) => {
  //     console.error("❌ Validation Errors:", errors);
  //   };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantInsuranceInfoSchemaDefaultValues}
      schema={applicantInsuranceInfoSchema}
      isMultiForm={true}
      //   onError={onError}
    >
      <InsuranceInfoFormContent />
    </Form>
  );
};

export default ApplicantInsuranceInfoFormPage;
