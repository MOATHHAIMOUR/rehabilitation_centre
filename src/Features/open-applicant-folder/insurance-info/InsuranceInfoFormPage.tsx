import { useNavigate } from "react-router-dom";
import { Form } from "../form/components/Form";
import { useFormContext, useWatch } from "react-hook-form";
import Box from "../../../components/ui/Box";
import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import { AnimatePresence, motion } from "framer-motion";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import {
  applicantInsuranceInfoSchema,
  applicantInsuranceInfoSchemaDefaultValues,
  TApplicantInsuranceInfoSchema,
} from "./applicantInsuranceInfoSchema";

/* ────────────── ✅ MAIN FORM COMPONENT ────────────── */
const ApplicantInsuranceInfoFormPage = () => {
  const navigate = useNavigate();

  /* ────────────── Submit Handler ────────────── */
  function handleSubmit(data: TApplicantInsuranceInfoSchema) {
    console.log("✅ Form Submitted:", data);
    navigate("/next-step"); // Redirect to the next step
  }

//   const onError = (errors: any) => {
//     console.error("❌ Validation Errors:", errors);
//   };

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={applicantInsuranceInfoSchemaDefaultValues}
      schema={applicantInsuranceInfoSchema}
    //   onError={onError}
    >
      <FormContent />
    </Form>
  );
};

export default ApplicantInsuranceInfoFormPage;

const FormContent = () => {
  /* ────────────── REACT HOOK FORM ────────────── */
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TApplicantInsuranceInfoSchema>();

  const isHaveInsurance =
    useWatch({
      control,
      name: "doseHaveInsurance",
    }) === 1;

  return (
    <Box>
      {/* هل المراجع مغطى في التأمين الصحي */}
      <ControlledSelectMenu
        control={control}
        label="هل المراجع مغطى في التأمين الصحي"
        name="doseHaveInsurance"
        options={[
          { value: 0, label: "لا" },
          { value: 1, label: "نعم" },
        ]}
      />

      {/* Animate Insurance Details if Selected */}
      <AnimatePresence>
        {isHaveInsurance && (
          <motion.div
            className="w-full grid grid-cols-1 gap-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="w-full grid grid-cols-1 gap-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* جهة التأمين */}
              <ControlledSelectMenu
                label="جهة التأمين"
                control={control}
                name="insuranceTypeId"
                options={[]}
                error={errors.insuranceTypeId}
              />

              {/* درجة التأمين */}
              <ControlledSelectMenu
                control={control}
                label="درجة التأمين"
                name="insuranceLevelId"
                options={[]}
                error={errors.insuranceLevelId}
              />

              {/* ملاحظات */}
              <CustomTextArea
                label="ملاحظات"
                {...register("notes")}
                name="notes"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
