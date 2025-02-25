import { useNavigate } from "react-router-dom";
import { Form } from "../../../components/components/Form";
import MotherInfoComponent from "./components/MotherInfoComponent";
import Box from "../../../components/ui/Box";
import { useFormContext } from "react-hook-form";
import {
  applicantParentsInfoSchema,
  applicantParentsInfoSchemaDefaultValues,
  TApplicantParentsInfoSchema,
} from "./types/ApplicantParentsSchema";
import FatherInfoComponent from "./components/FatherInfoComponent";

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
      isMultiForm={true}
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
    unregister,
    formState: { errors },
  } = useFormContext<TApplicantParentsInfoSchema>();

  return (
    <Box className="mt-10 flex flex-col gap-10">
      <FatherInfoComponent
        unregister={unregister}
        control={control}
        register={register}
        errors={errors}
      />
      <hr className="border-t-4 border-gray-900" /> {/* Solid line */}
      <MotherInfoComponent
        unregister={unregister}
        control={control}
        register={register}
        errors={errors}
      />
    </Box>
  );
};
