import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormUnregister,
  useWatch,
} from "react-hook-form";
import Box from "../../../../components/ui/Box";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { TApplicantParentsInfoSchema } from "../types/ApplicantParentsSchema";
import BirthComponent from "../../personal-info/components/PersonBirthData";
import { AnimatePresence, motion } from "framer-motion";
import MotherWorkInfo from "./MotherWorkInfo";
import { opacityAnimationProps } from "../../../question-management/animation";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

interface IProps {
  control: Control<TApplicantParentsInfoSchema>;
  register: UseFormRegister<TApplicantParentsInfoSchema>;
  errors: FieldErrors<TApplicantParentsInfoSchema>;
  unregister: UseFormUnregister<TApplicantParentsInfoSchema>;
}

const MotherInfoComponent = ({
  control,
  register,
  errors,
  unregister,
}: IProps) => {
  const isMotherHasWorkInfo = useWatch({
    control,
    name: "parentsInfo.mother.isHaveWorkInfo",
  });
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        معلومات الأم
      </h2>
      <hr className="h-px my-6 bg-gray-300 dark:bg-gray-700" />

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
        <CustomTextInput
          {...register("parentsInfo.mother.personInfo.nationalIdOrIqama")}
          isRequired={true}
          label="رقم الهوية أو الإقامة"
        />
        <CustomTextInput
          {...register("parentsInfo.mother.personInfo.fullName")}
          isRequired={true}
          label="الاسم الرباعي"
        />
        <CustomTextInput
          {...register("parentsInfo.mother.personInfo.phoneNumber")}
          isRequired={true}
          label="رقم الجوال"
        />
        <BirthComponent
          name="parentsInfo.mother.personInfo.dateOfBirthEn"
          control={control}
        />
        <CustomTextInput
          {...register("parentsInfo.mother.personInfo.email")}
          isRequired={false}
          label="البريد الإلكتروني"
        />
      </Box>

      <motion.label
        {...opacityAnimationProps}
        className="mt-8 mb-4 flex gap-2 items-center cursor-pointer"
      >
        <input
          type="checkbox"
          {...register("parentsInfo.mother.isHaveWorkInfo")}
          className="hidden"
        />
        {isMotherHasWorkInfo ? (
          <CiCircleMinus size={40} />
        ) : (
          <CiCirclePlus size={40} />
        )}
        <p
          className={`text-xl font-semibold transition-all duration-300 ${
            isMotherHasWorkInfo ? "" : ""
          } cursor-pointer`}
        >
          {isMotherHasWorkInfo
            ? " إلغاء معلومات عمل الأم"
            : " إضافة معلومات عمل للأم"}
        </p>
      </motion.label>

      <AnimatePresence>
        {isMotherHasWorkInfo && (
          <MotherWorkInfo
            control={control}
            errors={errors}
            register={register}
            unregister={unregister}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MotherInfoComponent;
