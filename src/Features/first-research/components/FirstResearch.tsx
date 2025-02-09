import { useState } from "react";
import { FirstResearchData } from "../data";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import ParentQuestions from "./ParentQuestions";

const FirstResearch = () => {
  /* ────────────── STATE  ────────────── */
  const [step, setStep] = useState(0);

  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const methods = useForm();
  const steps = [<ParentQuestions />];

  /* ────────────── HANDLERS  ────────────── */
  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };
  /* ────────────── RENDER ────────────── */
  const renderTaps = (
    <ul className="bg-gray-100  rounded-md  overflow-hidden w-40 flex flex-col items-end  text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {FirstResearchData.map((data, index) => {
        const activeTap = step === index;
        return (
          <li key={index} className="w-full">
            <a
              aria-current="page"
              className={`w-full inline-block p-2 text-sm truncate ${
                activeTap ? "bg-bg-primary text-white" : "bg-gray-100"
              }`}
              title={data} // Tooltip to show full text on hover
            >
              {data}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-[1fr,auto] gap-8"
      >
        {/* Steps */}
        <div className="">{steps[step]}</div>
        {/* Taps */}
        <div>
          <p className="font-medium text-center mb-4">أقسام البحث الأولي</p>
          {renderTaps}
        </div>
      </form>
    </FormProvider>
  );
};

export default FirstResearch;
