import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import ControlledSelectMenu from "../../../../components/ControlledSelectMenu";
import Box from "../../../../components/ui/Box";
import { IOpenApplicantFolder } from "../../interface";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CustomTextArea from "../../../../components/ui/CustomTextArea";

interface IProps {
  control: Control<IOpenApplicantFolder>;
  register: UseFormRegister<IOpenApplicantFolder>;
  errors: FieldErrors<IOpenApplicantFolder>;
}
const ApplicantInsuranceInfo = ({ control, errors, register }: IProps) => {
  const [isHaveInsurance, setIsHaveIsurance] = useState(false);

  function HandleChangeDoseHaveInsuranceInfo(val: number | undefined) {
    if (typeof val === "number") {
      setIsHaveIsurance(val === 1);
    }
  }
  return (
    <Box>
      <ControlledSelectMenu
        control={control}
        label="هل المراجع مغطى في التأمين الصحي "
        name="applicantInsuranceInfo.doseHaveInsurance"
        options={[
          { value: 0, label: "لا" },
          { value: 1, label: "نعم" },
        ]}
        externalOnChange={(e) => HandleChangeDoseHaveInsuranceInfo(e)}
      />

      <AnimatePresence>
        {isHaveInsurance && (
          <motion.div
            className="w-full grid grid-cols-1 gap-4"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <motion.div
              className="w-full grid grid-cols-1 gap-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ControlledSelectMenu
                label="جهة التأمين"
                control={control}
                name="applicantInsuranceInfo.insuranceTypeID"
                options={[]}
                error={errors.applicantInsuranceInfo?.insuranceTypeID}
              />
              <ControlledSelectMenu
                control={control}
                label="درجة التأمين"
                name="applicantInsuranceInfo.insuranceLevelId"
                options={[]}
                error={errors.applicantInsuranceInfo?.insuranceLevelId}
              />
              <CustomTextArea
                label="ملاحظات"
                {...register("applicantInsuranceInfo.note")}
                name="applicantInsuranceInfo.note"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ApplicantInsuranceInfo;
