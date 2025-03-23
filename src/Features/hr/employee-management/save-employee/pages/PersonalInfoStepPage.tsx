import {
  personalInfoSchema,
  TPersonalInfoForm,
  personalInfoDefaultValues,
} from "../types/personalInfoSchema";
import { useNavigate } from "react-router-dom";
import PersonalInfoFormContent from "../components/PersonalInfoFormContent";
import { Form } from "../../../../../components/components/Form";

const PersonalInfoStepPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: TPersonalInfoForm) => {
    console.log("Personal Info Submitted:", data);
    navigate("/hr/employee-management/save-employee/contact"); // Next step
  };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={personalInfoDefaultValues}
      schema={personalInfoSchema}
      isMultiForm={true}
    >
      <PersonalInfoFormContent />
    </Form>
  );
};

export default PersonalInfoStepPage;
