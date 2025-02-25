import { motion } from "framer-motion";
import WorkInfo from "../../work-info/components/WorkInfo";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormUnregister,
} from "react-hook-form";
import { TApplicantParentsInfoSchema } from "../types/ApplicantParentsSchema";
import { useEffect } from "react";
import { opacityAnimationProps } from "../../../question-management/animation";

interface IProps {
  control: Control<TApplicantParentsInfoSchema>;
  register: UseFormRegister<TApplicantParentsInfoSchema>;
  unregister: UseFormUnregister<TApplicantParentsInfoSchema>;
  errors: FieldErrors<TApplicantParentsInfoSchema>;
}

const FatherWorkInfo = ({ control, errors, register, unregister }: IProps) => {
  useEffect(() => {
    return () => {
      unregister("parentsInfo.father.workInfo");
    };
  }, [unregister]);

  return (
    <>
      <motion.div {...opacityAnimationProps}>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          معلومات عمل الأب
        </h3>
        <hr className="my-4 bg-gray-300 dark:bg-gray-700" />
        <WorkInfo
          control={control}
          register={register}
          errors={errors}
          companyIdName="parentsInfo.father.workInfo.companeyId"
          industryFieldName="parentsInfo.father.workInfo.workFieldId"
          sectorIdName="parentsInfo.father.workInfo.workSectorType"
          workPhoneName="parentsInfo.father.workInfo.workPhone"
        />
      </motion.div>
    </>
  );
};

export default FatherWorkInfo;
