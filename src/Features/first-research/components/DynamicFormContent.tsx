import { useFormContext } from "react-hook-form";
import { TResearchInfoSchema } from "../types/researchInfoSchema";
import Box from "../../../components/ui/Box";
import QuestionRenderer from "./QuestionRenderer";

const DynamicFormContent = () => {
  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    control,
    register,
    unregister,
    formState: { errors },
  } = useFormContext<TResearchInfoSchema>();

  /* ────────────── RENDER  ────────────── */
  const renderQuestions = []?.map((q, index) => {
    return (
      <Box key={1}>
        <QuestionRenderer
          q={q}
          register={register}
          control={control}
          errors={errors}
          index={index}
          unregister={unregister}
          namePrefix={`questionsAnswers.${index}`}
        />
      </Box>
    );
  });

  return <>{renderQuestions}</>;
};

export default DynamicFormContent;
