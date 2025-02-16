import { useNavigate } from "react-router-dom";
import { Form } from "../form/components/Form";
import MotherInfoComponent from "./components/FatherInfo";
import FatherInfoComponent from "./components/MotherInfo";
import Box from "../../../components/ui/Box";
import { useFormContext } from "react-hook-form";
import {
  applicantParentsInfoSchema,
  applicantParentsInfoSchemaDefaultValues,
  TApplicantParentsInfoSchema,
} from "./types/ApplicantParentsSchema";

const ApplicantParentsInfoFormPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantParentsInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

  // const onError = (errors: any) => {
  //   console.error("❌ Validation Errors:", errors);
  // };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantParentsInfoSchemaDefaultValues}
      schema={applicantParentsInfoSchema}
      // onError={onError}
    >
      <FormContent />
    </Form>
  );
};

export default ApplicantParentsInfoFormPage;

const FormContent = () => {
  /* ────────────── REACT-HOOK-FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantParentsInfoSchema>();

  return (
    <Box className="mt-10">
      <FatherInfoComponent
        control={control}
        register={register}
        errors={errors}
      />
      <MotherInfoComponent
        control={control}
        register={register}
        errors={errors}
      />
    </Box>
  );
};
