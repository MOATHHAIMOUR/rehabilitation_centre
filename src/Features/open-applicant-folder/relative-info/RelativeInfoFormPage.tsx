import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/components/Form";
import {
  applicantRelativeInfoSchema,
  applicantRelativeInfoSchemaDefaultValues,
  TApplicantRelativeInfoSchema,
} from "./types/applicantRelativeInfoSchema";
import RelativeInfoFormContent from "./components/RelativeInfoFormContent";

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
      isMultiForm={true}
      //   onError={onError}
    >
      <RelativeInfoFormContent />
    </Form>
  );
};

export default ApplicantRelativeInfoPage;
