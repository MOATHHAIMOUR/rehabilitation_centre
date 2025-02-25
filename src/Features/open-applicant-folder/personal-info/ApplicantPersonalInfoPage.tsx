import {
  applicantPersonalInfoSchema,
  defaultValues,
  TapplicantPersonalInfoSchema,
} from "./types/applicantPersonalInfoSchema";
import { Form } from "../../../components/components/Form";
import { useNavigate } from "react-router-dom";
import ApplicantPersonalInfoFormContent from "./components/ApplicantPersonalInfoFormContent";

const ApplicantPersonalInfoPage = () => {
  /* ────────────── STATE ────────────── */
  const navigate = useNavigate();
  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const handleSubmit = (data: TapplicantPersonalInfoSchema) => {
    console.log("Form Submitted:", data);
    navigate("/add-applicant/classification-info");
  };

  // const onError = (errors: any) => {
  //   console.error("Form Validation Errors:", errors);

  //   // Optional: Log each error field separately
  //   Object.keys(errors).forEach((field) => {
  //     console.error(`❌ Error in "${field}":`, errors[field].message);
  //   });
  // };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
      schema={applicantPersonalInfoSchema}
      isMultiForm={true}
    >
      {/* ✅ Moved Form Fields Inside `FormContent` */}
      <ApplicantPersonalInfoFormContent />
    </Form>
  );
};

export default ApplicantPersonalInfoPage;
