import {
  jobInfoSchema,
  jobInfoDefaultValues,
  TJobInfoForm,
} from "../types/jobInfoSchema";

import { useNavigate } from "react-router-dom";
import JobInfoFormContent from "../components/JobInfoFormContent";
import { Form } from "../../../../../components/components/Form";

const JobInfoPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: TJobInfoForm) => {
    console.log("Job Info Submitted:", data);
    navigate("/employees/create/review"); // Go to final review step
  };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={jobInfoDefaultValues}
      schema={jobInfoSchema}
      isMultiForm={true}
    >
      <JobInfoFormContent />
    </Form>
  );
};

export default JobInfoPage;
