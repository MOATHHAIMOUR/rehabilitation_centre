import { Form } from "../../../../components/components/Form";
import {
  registerFormSchemaDefaultValues,
  registerSchema,
  TRegisterFormSchema,
} from "../types/registerSchema";
import { SubmitHandler } from "react-hook-form";
import RegisterFormContent from "./RegisterFormContent";

const RegisterForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit: SubmitHandler<TRegisterFormSchema> = (data) => {
    console.log("submitted");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    console.log("❌ Zod Validation Errors:", errors);
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        schema={registerSchema}
        defaultValues={registerFormSchemaDefaultValues}
        isMultiForm={false}
        buttonText="إنشاء حساب"
        displayRequiredFieldAlert={false}
        onError={onError}
      >
        <RegisterFormContent />
      </Form>
    </>
  );
};

export default RegisterForm;
