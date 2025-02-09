import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IOpenApplicantFolder } from "../../interface";
import Button from "../../../../components/ui/Button";
import { applicantTapsData } from "../../data";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Box from "../../../../components/ui/Box";
import { AnimatePresence, motion } from "framer-motion";

const OpenApplicantFolder = () => {
  /* ────────────── STATE  ────────────── */
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // Direction: -1 for left, 1 for right
  const { t } = useTranslation();

  /* ────────────── DERIVED VALS  ────────────── */
  const IsLastTap = step === applicantTapsData.length - 1;
  const IsFirstTap = step === 0;

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const methods = useForm<IOpenApplicantFolder>();
  const steps = [];
  const onSubmit: SubmitHandler<IOpenApplicantFolder> = (data) => {
    console.log("Form Data:", data);
  };
  /* ────────────── Handlers  ────────────── */

  const HandleNextTapHandler = () => {
    if (IsLastTap) return;
    setDirection(1); // Moving left
    setStep((prev) => prev + 1);
  };

  const HandlePrevTapHandler = () => {
    if (IsFirstTap) return;
    setDirection(-1); // Moving right
    setStep((prev) => prev - 1);
  };

  /* ────────────── RENDER ────────────── */
  const renderTaps = (
    <motion.ul className="mt-6 mb-6 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {applicantTapsData.map((applicantTap, index) => {
        const activeTap = step === index;
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {renderTaps}
        <AnimatePresence mode="wait" custom={direction}>
          {steps[step]}
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
    </FormProvider>
  );
};

export default OpenApplicantFolder;
