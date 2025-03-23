import {
  contactInfoSchema,
  contactInfoDefaultValues,
  TContactInfoForm,
} from "../types/contactInfoSchema";

import { useNavigate } from "react-router-dom";
import ContactInfoFormContent from "../components/ContactInfoFormContent";
import { Form } from "../../../../../components/components/Form";

const ContactInfoPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: TContactInfoForm) => {
    console.log("Contact Info Submitted:", data);
    navigate("/employees/create/job");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={contactInfoDefaultValues}
      schema={contactInfoSchema}
      isMultiForm={true}
    >
      <ContactInfoFormContent />
    </Form>
  );
};

export default ContactInfoPage;
