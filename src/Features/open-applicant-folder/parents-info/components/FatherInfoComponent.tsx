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
import FatherWorkInfo from "./FatherWorkInfo";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { opacityAnimationProps } from "../../../question-management/animation";

interface IProps {
  control: Control<TApplicantParentsInfoSchema>;
  register: UseFormRegister<TApplicantParentsInfoSchema>;
  errors: FieldErrors<TApplicantParentsInfoSchema>;
  unregister: UseFormUnregister<TApplicantParentsInfoSchema>;
}

const FatherInfoComponent = ({
  control,
  unregister,
  register,
  errors,
}: IProps) => {
  const isFatherHasWorkInfo = useWatch({
    control,
    name: "parentsInfo.father.isHaveWorkInfo",
  });

  return (
    <section className="">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
        معلومات الأب
      </h2>
      <hr className="h-px my-6 bg-gray-300 dark:bg-gray-700" />

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
        <CustomTextInput
          {...register("parentsInfo.father.personInfo.nationalIdOrIqama")}
          isRequired={true}
          label="رقم الهوية أو الإقامة"
        />
        <CustomTextInput
          {...register("parentsInfo.father.personInfo.fullName")}
          isRequired={true}
          label="الاسم الرباعي"
        />
        <CustomTextInput
          {...register("parentsInfo.father.personInfo.phoneNumber")}
          isRequired={true}
          label="رقم الجوال"
        />
        <BirthComponent
          name="parentsInfo.father.personInfo.dateOfBirthEn"
          control={control}
        />
        <CustomTextInput
          {...register("parentsInfo.father.personInfo.email")}
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
          {...register("parentsInfo.father.isHaveWorkInfo")}
          className="hidden"
        />
        {isFatherHasWorkInfo ? (
          <CiCircleMinus size={40} className="" />
        ) : (
          <CiCirclePlus size={40} className="" />
        )}
        <p
          className={`text-xl font-semibold transition-all duration-300 ${
            isFatherHasWorkInfo ? "" : ""
          } cursor-pointer`}
        >
          {isFatherHasWorkInfo
            ? " إلغاء معلومات عمل الأب"
            : " إضافة معلومات عمل الأب"}
        </p>
      </motion.label>

      <AnimatePresence>
        {isFatherHasWorkInfo && (
          <FatherWorkInfo
            control={control}
            errors={errors}
            register={register}
            unregister={unregister}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default FatherInfoComponent;
