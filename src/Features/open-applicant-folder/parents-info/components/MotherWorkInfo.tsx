import WorkInfo from "../../work-info/components/WorkInfo";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormUnregister,
} from "react-hook-form";
import { TApplicantParentsInfoSchema } from "../types/ApplicantParentsSchema";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { opacityAnimationProps } from "../../../question-management/animation";

interface IProps {
  control: Control<TApplicantParentsInfoSchema>;
  register: UseFormRegister<TApplicantParentsInfoSchema>;
  unregister: UseFormUnregister<TApplicantParentsInfoSchema>;
  errors: FieldErrors<TApplicantParentsInfoSchema>;
}

const MotherWorkInfo = ({ control, errors, register, unregister }: IProps) => {
  useEffect(() => {
    return () => {
      unregister("parentsInfo.mother.workInfo");
    };
  }, [unregister]);

  return (
    <motion.div {...opacityAnimationProps}>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
        معلومات عمل الأم
      </h3>
      <hr className="my-4 bg-gray-300 dark:bg-gray-700" />
      <WorkInfo
        control={control}
        register={register}
        errors={errors}
        companyIdName="parentsInfo.mother.workInfo.companeyId"
        industryFieldName="parentsInfo.mother.workInfo.workFieldId"
        sectorIdName="parentsInfo.mother.workInfo.workSectorType"
        workPhoneName="parentsInfo.mother.workInfo.workPhone"
      />
    </motion.div>
  );
};

export default MotherWorkInfo;
