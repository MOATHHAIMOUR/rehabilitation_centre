import {
  researchInfoSchema,
  TResearchInfoSchema,
} from "../types/researchInfoSchema";
import { SubmitHandler } from "react-hook-form";
import DynamicResearchQuestionFormContent from "./DynamicResearchQuestionFormContent";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { updateResarchCategoryFormData } from "../store/researshSlice";
import { Form } from "../../../components/components/Form";

const DynamicResearchQuestionForm = () => {
  const { pathname } = useLocation();
  const researchTypePathName = pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log("path");
  console.log(pathname);

  const researchData = useAppSelector(
    (state) => state.researshSlice.researchDic[researchTypePathName]
  );

  const currentformData = researchData.researchFormsData.find(
    (p) => p.currentPath === pathname
  )!;

  const handleSubmit: SubmitHandler<TResearchInfoSchema> = (data) => {
    console.log("DATA");
    console.log(data);
    if (currentformData.nextpath !== null) {
      const fullFormData = {
        questions: data.questions.map((q, index) => ({
          ...q,
          questionText: currentformData.formData.questions[index].questionText,
          questionChoices:
            currentformData.formData.questions[index].questionChoices,
        })),
      };
      console.log("NEXT fullFormData");
      console.log(fullFormData);
      dispatch(
        updateResarchCategoryFormData({
          researchTypeName: researchTypePathName,
          currentFormPath: pathname,
          updatedForm: fullFormData,
        })
      );

      navigate(currentformData.nextpath);
    }
  };

  function handlePrev(data: TResearchInfoSchema) {
    if (currentformData.prevpath !== null) {
      const fullFormData = {
        questions: data.questions.map((q, index) => ({
          ...q,
          questionText: currentformData.formData.questions[index].questionText,
          questionChoices:
            currentformData.formData.questions[index].questionChoices,
        })),
      };

      console.log("PREV fullFormData");
      console.log(fullFormData);

      dispatch(
        updateResarchCategoryFormData({
          researchTypeName: researchTypePathName,
          currentFormPath: pathname,
          updatedForm: data,
        })
      );

      navigate(currentformData.prevpath);
    }
  }
  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     console.log("Validation Errors:");
  //     Object.entries(errors).forEach(([key, value]) => {
  //       console.log(`${key}: ${value.message}`);
  //     });
  //   }
  // }, [errors]);

  const onError = (errors: any) => {
    console.log("❌ Zod Validation Errors:", errors);
  };

  if (!currentformData) return <Navigate to="not-found" />;

  return (
    <Form
      onError={onError}
      schema={researchInfoSchema}
      defaultValues={currentformData.formData}
      IsFirstForm={currentformData.IsFirstPath}
      IsLastForm={currentformData.IsLastPath}
      isMultiForm={true}
      onPrev={handlePrev}
      onSubmit={handleSubmit}
    >
      <DynamicResearchQuestionFormContent
        currentFormData={currentformData.formData}
      />
    </Form>
  );
};

export default DynamicResearchQuestionForm;
