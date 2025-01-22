import { SubmitHandler, useForm } from "react-hook-form";
import PersonalInfoFields from "./PersonalInfoFields";
import { IOpenApplicantFolder } from "../../interface";
import Button from "../../../../components/ui/Button";
import { applicantTapsData } from "../../data";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "../../../../components/ui/Box";
import EducationInfo from "./EducationInfo";
import ApplicantComplaintInfo from "./ApplicantComplaintInfo";
import ApplicantClassificationInfo from "./ApplicantClassificationInfo";
import ApplicantParentInfo from "./ApplicantParentInfo";
import { motion, AnimatePresence } from "framer-motion";
import ApplicantWorkInfo from "./ApplicantWorkInfo";
import ApplicantRelativeInfo from "./ApplicantRelativeInfo";
import ApplicantInsuranceInfo from "./ApplicantInsuranceInfo";

const OpenApplicantFolder = () => {
  /* ────────────── STATE  ────────────── */
  const {
    control,
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IOpenApplicantFolder>({
    defaultValues: {
      applicatnPersonInfo: {
        gender: undefined,
        nationality: "",
        dateOfBirthEn: undefined,
      },
      applicantLocationInfo: {
        cityId: undefined,
        countryId: undefined,
        districtId: undefined,
        regionId: undefined,
      },
      applicantComplaint: {
        ComplaintIds: [],
      },
    },
  });

  const [tapIndex, setTapIndex] = useState(4);
  const [direction, setDirection] = useState(0); // Direction: -1 for left, 1 for right
  const IsLastTap = tapIndex === applicantTapsData.length - 1;
  const IsFirstTap = tapIndex === 0;
  const { t } = useTranslation();

  /* ────────────── Animation Variants ────────────── */
  const animationVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50, // Slide direction based on action
    }),
    visible: { opacity: 1, x: 0 },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50, // Slide opposite to entry
    }),
  };

  /* ────────────── Handlers  ────────────── */
  const onSubmit: SubmitHandler<IOpenApplicantFolder> = (data) => {
    console.log("Form Data:", data);
  };

  const HandleNextTapHandler = () => {
    if (IsLastTap) return;
    setDirection(1); // Moving left
    setTapIndex((prev) => prev + 1);
  };

  const HandlePrevTapHandler = () => {
    if (IsFirstTap) return;
    setDirection(-1); // Moving right
    setTapIndex((prev) => prev - 1);
  };

  /* ────────────── RENDER ────────────── */
  const renderTaps = (
    <motion.ul className="mt-6 mb-6 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {applicantTapsData.map((applicantTap, index) => {
        const activeTap = tapIndex === index;
        return (
          <li key={index} className={`me-2`}>
            <a
              aria-current="page"
              className={`inline-block p-4 ${
                activeTap ? "bg-bg-primary text-white" : "bg-gray-100"
              }`}
            >
              {t(applicantTap.Title as "SafeType")}
            </a>
          </li>
        );
      })}
    </motion.ul>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderTaps}

      <AnimatePresence mode="wait" custom={direction}>
        {tapIndex === 0 && (
          <motion.div
            key="personal-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <PersonalInfoFields
              setValue={setValue}
              control={control}
              register={register}
              clearErrors={clearErrors}
              errors={errors}
            />
          </motion.div>
        )}
        {tapIndex === 1 && (
          <motion.div
            key="classification-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ApplicantClassificationInfo
              control={control}
              register={register}
              errors={errors}
            />
          </motion.div>
        )}
        {tapIndex === 2 && (
          <motion.div
            key="education-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <EducationInfo
              control={control}
              register={register}
              errors={errors}
            />
          </motion.div>
        )}
        {tapIndex === 3 && (
          <motion.div
            key="complaint-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ApplicantComplaintInfo
              control={control}
              register={register}
              errors={errors}
            />
          </motion.div>
        )}
        {tapIndex === 4 && (
          <motion.div
            key="applicant-work-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ApplicantWorkInfo
              control={control}
              register={register}
              errors={errors}
            />
          </motion.div>
        )}
        {tapIndex === 5 && (
          <motion.div
            key="parent-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ApplicantParentInfo
              control={control}
              clearErrors={clearErrors}
              setValue={setValue}
              register={register}
              errors={errors}
            />
          </motion.div>
        )}
        {tapIndex === 6 && (
          <motion.div
            key="relative-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ApplicantRelativeInfo
              control={control}
              register={register}
              errors={errors}
            />
          </motion.div>
        )}
        {tapIndex === 7 && (
          <motion.div
            key="insurance-info"
            custom={direction}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ApplicantInsuranceInfo
              control={control}
              register={register}
              errors={errors}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Box className="flex justify-between my-10 gap-4">
        <Button
          onClick={HandlePrevTapHandler}
          type="button"
          disabled={IsFirstTap}
          className="mt-4 bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
        >
          السابق
        </Button>

        <Button
          onClick={HandleNextTapHandler}
          type="button"
          className="mt-4 bg-bg-primary hover:bg-slate-950 text-white py-2 px-10 rounded"
        >
          التالي
        </Button>
      </Box>
    </form>
  );
};

export default OpenApplicantFolder;
