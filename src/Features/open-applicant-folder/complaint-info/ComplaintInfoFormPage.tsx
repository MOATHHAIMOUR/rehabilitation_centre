import { useNavigate } from "react-router-dom";
import {
  applicantComplaintInfoDefaultValues,
  applicantComplaintInfoSchema,
  TApplicantComplaintInfoSchema,
} from "./types/complaintInfoShcema";
import { Form } from "../../../components/components/Form";
import ComplaintInfoFormConetent from "./components/ComplaintInfoFormConetent";

/* ────────────── ✅ MAIN FORM COMPONENT ────────────── */
const ApplicantComplaintInfoPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantComplaintInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

  //   const onError = (errors: any) => {
  //     console.error("❌ Validation Errors:", errors);
  //   };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantComplaintInfoDefaultValues}
      schema={applicantComplaintInfoSchema}
      isMultiForm={true}
    >
      <ComplaintInfoFormConetent />
    </Form>
  );
};

export default ApplicantComplaintInfoPage;
