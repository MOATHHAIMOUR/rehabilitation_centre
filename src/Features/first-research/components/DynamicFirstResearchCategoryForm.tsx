import { useEffect } from "react";
import {
  IStageCategory,
  useGetAllStagesCategoryByStageIdQuery,
} from "../../../store/stageCategoryApiSlice";
import { EnResearshType } from "../Enum";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Form } from "../../open-applicant-folder/form/components/Form";
import {
  IFirstResearshFormsData,
  setForm,
  setUpResearshForm,
} from "../store/FirstResearshSlice";
import {
  researchInfoSchema,
  researchInfoSchemaDefaultValues,
  TResearchInfoSchema,
} from "../types/researchInfoSchema";
import { useFormContext } from "react-hook-form";
import QuestionRenderer from "./QuestionRenderer";
import { EnumAnswerType } from "../../question-management/enums";
import Box from "../../../components/ui/Box";
import StageCategoryTree from "./StageCategoryTree";

const questionsData: {
  questionId: number;
  nameAr: string;
  answerTypeId: EnumAnswerType;
  isRequired: boolean;
  questionsChoices?: { choiceName: string; questionChoiceId: number }[];
}[] = [
  {
    questionId: 0,
    nameAr: "Test Question 1",
    answerTypeId: EnumAnswerType.SelecetMenuWithOneAnswer,
    isRequired: true,
    questionsChoices: [{ choiceName: "optionA", questionChoiceId: 1 }],
  },
  {
    questionId: 1,
    nameAr: "Test Question 2",
    answerTypeId: EnumAnswerType.SelecetMenuWithOneAnswer,
    isRequired: false,
    questionsChoices: [{ choiceName: "optionA", questionChoiceId: 1 }],
  },
  {
    questionId: 3,
    nameAr: "Test Question 2",
    answerTypeId: EnumAnswerType.SelecetMenuWithOneAnswer,
    isRequired: true,
    questionsChoices: [{ choiceName: "optionA", questionChoiceId: 1 }],
  },
];

function BuildMainDaynamicResearshValues(
  data: IStageCategory[],
  name: string,
  dataResearchVals: IFirstResearshFormsData[],
  dataResearchValsSize: number
): IFirstResearshFormsData[] {
  for (let i = 0; i < data.length; i++) {
    const stagecategory = data[i];
    if (stagecategory.childCategories.length === 0) {
      dataResearchVals.push({
        key:
          dataResearchVals.length > 0
            ? dataResearchVals[dataResearchVals.length - 1].key + 1
            : 0,
        IsFirstPath: i == 0,
        IsLastPath: dataResearchVals.length + 1 === dataResearchValsSize,
        name: stagecategory.nameEn,
        path: `http://localhost:5174/first-researsh/${
          name === "" ? stagecategory.nameEn : name
        }`,
        stageCategoryId: stagecategory.stageCategoryId,
      });
    }
    BuildMainDaynamicResearshValues(
      stagecategory.childCategories,
      name + stagecategory.nameEn + "-",
      dataResearchVals,
      dataResearchValsSize
    );
  }

  return dataResearchVals;
}

const DynamicFirstResearchCategoryForm = () => {
  /* ────────────── STORE  ────────────── */
  const dispatch = useAppDispatch();
  const IsDataFetched = useAppSelector((s) => s.firstResearsh.IsDataFetched);
  const { data: FirstResearshStageCategoriesResponse } =
    useGetAllStagesCategoryByStageIdQuery(EnResearshType.FirstResearsh, {
      skip: IsDataFetched,
    });
  const CurrentFormData = useAppSelector(
    (state) => state.firstResearsh.CurrentFormInfo
  );
  const FirstResearshFormsData = useAppSelector(
    (state) => state.firstResearsh.FirstResearshFormsData
  );

  /* ────────────── STATES  ────────────── */
  //const navigate = useNavigate();
  /* ────────────── EFFECTS  ────────────── */
  useEffect(() => {
    console.log("outside");
    if (FirstResearshStageCategoriesResponse?.data) {
      console.log("inside");
      const data = BuildMainDaynamicResearshValues(
        FirstResearshStageCategoriesResponse?.data,
        "",
        [],
        FirstResearshStageCategoriesResponse?.data.length
      );
      dispatch(setUpResearshForm(data));
    }
  }, [FirstResearshStageCategoriesResponse?.data, dispatch]);

  /* ────────────── HANDLERS  ────────────── */
  function handleSubmit() {
    console.log("submited Correct");
    if (!CurrentFormData.IsLastForm) {
      const nextFormData = FirstResearshFormsData[CurrentFormData.formKey + 1];
      dispatch(
        setForm({
          currentPath: nextFormData.path,
          formKey: nextFormData.key,
          IsFirstForm: nextFormData.IsFirstPath,
          IsLastForm: nextFormData.IsLastPath,
          NextPath: nextFormData.IsLastPath
            ? null
            : FirstResearshFormsData[nextFormData.key + 1].path,
          prevPath: CurrentFormData.currentPath,
          stageCategoryId: nextFormData.stageCategoryId,
        })
      );
    } else {
      // handle submit all forms logic
    }
  }

  function handlePrev() {
    if (!CurrentFormData.IsFirstForm) {
      const prevFormData = FirstResearshFormsData[CurrentFormData.formKey - 1];
      dispatch(
        setForm({
          currentPath: prevFormData.path,
          formKey: prevFormData.key,
          IsFirstForm: prevFormData.IsFirstPath,
          IsLastForm: prevFormData.IsLastPath,
          NextPath: CurrentFormData.currentPath,
          prevPath: prevFormData.IsFirstPath
            ? null
            : FirstResearshFormsData[prevFormData.key - 1].path,
          stageCategoryId: prevFormData.stageCategoryId,
        })
      );
    }
  }

  // const onError = (errors: any) => {
  //   console.log("❌ Zod Validation Errors:", errors);
  // };

  function onSelectStageCategoryNode(stageCategoryId: number) {
    const formData = FirstResearshFormsData.find(
      (s) => s.stageCategoryId === stageCategoryId
    )!;
    dispatch(
      setForm({
        currentPath: formData.path,
        formKey: formData.key,
        IsFirstForm: formData.IsFirstPath,
        IsLastForm: formData.IsLastPath,
        NextPath: !formData.IsLastPath
          ? FirstResearshFormsData[formData.key + 1].path
          : null,
        prevPath: !formData.IsFirstPath
          ? FirstResearshFormsData[formData.key - 1].path
          : null,
        stageCategoryId: formData.stageCategoryId,
      })
    );
  }

  return (
    <Box className="flex gap-20">
      <Box className="flex-grow">
        <Form
          schema={researchInfoSchema}
          defaultValues={researchInfoSchemaDefaultValues}
          IsFirstForm={CurrentFormData.IsFirstForm}
          IsLastForm={CurrentFormData.IsLastForm}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
        >
          <FormContent />
        </Form>
      </Box>
      <Box>
        <StageCategoryTree onClickNode={onSelectStageCategoryNode} />
      </Box>
    </Box>
  );
};

export default DynamicFirstResearchCategoryForm;

const FormContent = () => {
  /* ────────────── REACT-HOOK-FORM  ────────────── */
  const {
    control,
    register,
    unregister,
    formState: { errors },
  } = useFormContext<TResearchInfoSchema>();

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     console.log("Validation Errors:");
  //     Object.entries(errors).forEach(([key, value]) => {
  //       console.log(`${key}: ${value.message}`);
  //     });
  //   }
  // }, [errors]);

  // useEffect(() => {
  //   console.log("Form State:", getValues());
  //   console.log("Errors:", errors);
  // }, [getValues(), errors]);

  /* ────────────── RENDER  ────────────── */
  const renderQuestions = questionsData.map((q, index) => {
    return (
      <Box key={q.questionId}>
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
