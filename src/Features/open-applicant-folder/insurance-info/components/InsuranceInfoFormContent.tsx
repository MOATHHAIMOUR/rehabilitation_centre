import { useFormContext, useWatch } from "react-hook-form";
import { TApplicantInsuranceInfoSchema } from "../types/applicantInsuranceInfoSchema";
import { AnimatePresence, motion } from "framer-motion"; // Corrected import
import Box from "../../../../components/ui/Box";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import { ControlledSelectMenu } from "../../../../components/ControlledSelectMenu";

const InsuranceInfoFormContent = () => {
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
      <div className="col-span-full border-b border-gray-300 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">معلومات التأمين</h2>
      </div>
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
                error={errors.insuranceTypeId} // Ensure this matches the expected type
              />

              {/* درجة التأمين */}
              <ControlledSelectMenu
                control={control}
                label="درجة التأمين"
                name="insuranceLevelId"
                options={[]}
                error={errors.insuranceLevelId} // Ensure this matches the expected type
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

export default InsuranceInfoFormContent;
