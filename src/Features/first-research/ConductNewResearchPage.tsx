import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "../../components/ui/Box";
import { useEffect, useMemo } from "react";
import { useGetAllResearchTypesQuery } from "../../store/services/researchTypeSliceApi";
import { convertValToUrlType } from "./utils";
import FetchApplicantSummaryProfile from "./components/FetchApplicantSummaryProfile";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  IResearch,
  IResearchFormData,
  IResearchTypeData,
  setResearchTypes,
  startResearch,
} from "./store/researshSlice";
import Button from "../../components/ui/Button";
import {
  IResearchQuestionView,
  useLazyGetResearchQuestionsByResearchTypeIdQuery,
} from "../../store/services/questionApiSlice";
import { BuildResearshCategoriesIds } from "./Helpers/indes";
import {
  IResearchCategory,
  useLazyGetAllResearchCategoriesByResearchTypeIdQuery,
} from "../../store/services/researchCategoryApiSlice";
const ConductNewResearchPage = () => {
  /* ────────────── STATE & Store  ────────────── */

  const [getResearchQuestions] =
    useLazyGetResearchQuestionsByResearchTypeIdQuery();
  const [getResearchCategories] =
    useLazyGetAllResearchCategoriesByResearchTypeIdQuery();
  const path = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const researchTypePathName = path.pathname.split("/")[2];

  const researshSlice = useAppSelector((state) => state?.researshSlice);

  const researchData = researshSlice?.researchDic?.[researchTypePathName];

  const isResearchStarted = researchData?.isStarted ?? false;

  const { data: researchTypes } = useGetAllResearchTypesQuery(undefined, {
    skip: isResearchStarted,
  });

  const firstResearchCategoryPath =
    researchData?.researchFormsData?.[0]?.currentPath;

  const researchTypeId = researshSlice.researchTypesData.find(
    (r) => r.name === researchTypePathName
  )?.id;

  /* ────────────── Derived Vlas  ────────────── */
  const researchTypesNameAsPathFormat: IResearchTypeData[] = useMemo(() => {
    return (
      researchTypes?.data.map((p) => {
        return {
          id: p.researchTypeId, // Convert to number
          name: convertValToUrlType(p.researchTypeNameEn),
        };
      }) ?? []
    );
  }, [researchTypes?.data]);

  /* ────────────── EFFECT  ────────────── */
  useEffect(() => {
    if (path.pathname.split("/")?.length == 3 && isResearchStarted) {
      navigate(firstResearchCategoryPath, { replace: true });
      return;
    }
    if (researchTypesNameAsPathFormat.length > 0) {
      if (
        !researchTypesNameAsPathFormat
          .map((p) => p.name)
          .includes(researchTypePathName)
      ) {
        navigate("/not-found", { replace: true });
        return;
      }
      if ((researshSlice?.researchTypesData?.length ?? 0) === 0) {
        dispatch(setResearchTypes(researchTypesNameAsPathFormat));
      }
    }
  }, [
    dispatch,
    firstResearchCategoryPath,
    isResearchStarted,
    navigate,
    path,
    researchTypePathName,
    researchTypesNameAsPathFormat,
    researshSlice?.researchTypesData?.length,
  ]);

  /* ────────────── Handlers  ────────────── */
  async function onStartResearchHandler() {
    const researchQuestionsReseponse = await getResearchQuestions(
      researchTypeId!
    );
    const researchQuestionsData = researchQuestionsReseponse.data;

    const researchCategoriesResponse = await getResearchCategories(
      researchTypeId!
    );

    const researchCategoryData = researchCategoriesResponse.data;

    const researchFormsData: IResearchFormData[] = BuildResearchFormsData(
      researchQuestionsData?.data ?? [],
      researchTypePathName,
      researchCategoryData?.data ?? []
    );

    const researchData: IResearch = {
      isStarted: true,
      nationalNo: "20210212",
      researchTypeName: researchTypePathName,
      researchFormsData: researchFormsData,
      researchTypeId: researchTypeId!,
      researchCategoriesData: researchCategoryData?.data ?? [],
      currentResearchCategoryForm: null!,
    };

    dispatch(startResearch(researchData));

    // navigate to first step in the research
    navigate(researchData.researchFormsData?.[0].currentPath, {
      replace: true,
    });
  }

  return (
    <Box className="flex flex-col gap-8">
      <FetchApplicantSummaryProfile />
      {!isResearchStarted && (
        <Button
          onClick={onStartResearchHandler}
          className="bg-bg-primary text-white p-2 rounded-md px-4"
        >
          البدء بالبحث
        </Button>
      )}

      <Outlet />
    </Box>
  );
};

export default ConductNewResearchPage;

function BuildResearchFormsData(
  researchQuestionsData: IResearchQuestionView[],
  researchTypePathName: string,
  researchCategoryData: IResearchCategory[]
): IResearchFormData[] {
  console.log(researchQuestionsData);
  return (
    researchQuestionsData.map((p, index) => {
      const nextPath =
        index === researchQuestionsData.length - 1
          ? null
          : `/research/${researchTypePathName}/${convertValToUrlType(
              researchQuestionsData[index + 1].researchCategoryNameEn
            )}`;

      const prevPath =
        index === 0
          ? null
          : `/research/${researchTypePathName}/${convertValToUrlType(
              researchQuestionsData[index - 1].researchCategoryNameEn
            )}`;

      return {
        researchCategoryId: p.researchCategoryId,
        currentPath: `/research/${researchTypePathName}/${convertValToUrlType(
          p.researchCategoryNameEn
        )}`,
        prevpath: prevPath,
        nextpath: nextPath,
        key: index,
        IsLastPath: index === researchQuestionsData.length - 1,
        IsFirstPath: index === 0,
        researchCategoriesIdsPath: BuildResearshCategoriesIds(
          researchCategoryData ?? [],
          p.researchCategoryId,
          []
        ),
        formData: {
          questions: Array.isArray(p.researchQuestions)
            ? p.researchQuestions.map((q) => ({
                answerType: q.answerTypeId,
                isRequired: q.isAnswerRequired ? "yes" : "no",
                questionId: q.researchQuestionId,
                questionText: q.questionText,
                questionChoices: Array.isArray(q.questionsChoices)
                  ? q.questionsChoices.map((x) => ({
                      value: x.researchQuestionChoiceId,
                      label: x.choiceName,
                    }))
                  : [],
                answers: [],
                isHasNotes: false,
              }))
            : [],
        },
      };
    }) ?? []
  );
}
