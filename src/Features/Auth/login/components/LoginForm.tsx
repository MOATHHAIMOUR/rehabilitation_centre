import { SubmitHandler, useFormContext } from "react-hook-form";
import { FaIdCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Form } from "../../../../components/components/Form";
import {
  loginFormSchemaDefaultValues,
  loginSchema,
  TLoginFormSchema,
} from "../types/loginSchema";
import Box from "../../../../components/ui/Box";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import Button from "../../../../components/ui/Button";

const LoginForm = () => {
  const handleSubmit: SubmitHandler<TLoginFormSchema> = (data) => {
    console.log("Login Submitted", data);
  };

  // const onError = (errors: any) => {
  //   console.log("❌ Validation Errors:", errors);
  // };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        defaultValues={loginFormSchemaDefaultValues}
        schema={loginSchema}
        isMultiForm={false}
        buttonText="تسجيل الدخول"
        displayRequiredFieldAlert={false}
      >
        <FormContent />
      </Form>
    </div>
  );
};

export default LoginForm;

const FormContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TLoginFormSchema>();

  return (
    <Box className="flex flex-col gap-3">
      <CustomTextInput
        isRequired={true}
        {...register("nationalNo")}
        SuffixIcon={FaIdCard}
        label="الرقم الوطني"
        placeholder="أدخل الرقم الوطني"
        error={errors.nationalNo?.message}
      />

      <CustomTextInput
        isRequired={true}
        {...register("password")}
        SuffixIcon={RiLockPasswordFill}
        label="كلمة المرور"
        type="password"
        placeholder="أدخل كلمة المرور"
        error={errors.password?.message}
      />

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("rememberMe")} id="rememberMe" />
        <label htmlFor="rememberMe" className="text-sm text-gray-700">
          تذكرني
        </label>
      </div>
    </Box>
  );
};
