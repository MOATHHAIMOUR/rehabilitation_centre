import { useFormContext } from "react-hook-form";
import { TResearchInfoSchema } from "../types/researchInfoSchema";
import QuestionRenderer from "./QuestionRenderer";
import { useEffect } from "react";

interface IProps {
  currentFormData: TResearchInfoSchema;
}
const DynamicResearchQuestionFormContent = ({ currentFormData }: IProps) => {
  const {
    control,
    register,
    unregister,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<TResearchInfoSchema>();

  console.log(getValues());
  useEffect(() => {
    if (currentFormData) {
      setValue("questions", currentFormData.questions); // <- This loads all fields, not just questions.
    }
  }, [currentFormData, setValue]);

  console.log("currentFormData?.questions");
  console.log(currentFormData?.questions);
  const renderQuestions = currentFormData?.questions?.map((q, index) => {
    return (
      <QuestionRenderer
        key={index}
        q={q}
        register={register}
        control={control}
        errors={errors}
        index={index}
        unregister={unregister}
        namePrefix={`questions.${index}`}
      />
    );
  });

  return <>{renderQuestions}</>;
};

export default DynamicResearchQuestionFormContent;
