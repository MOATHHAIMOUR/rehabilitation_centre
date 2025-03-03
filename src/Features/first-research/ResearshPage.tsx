import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";

import ResearchCategoryTree from "./components/ResearchCategoryTree";

import { findResearchCategoryByResearchCategoryNamePath } from "../question-management/utils";
import DynamicResearchQuestionForm from "./components/DynamicResearchQuestionForm";
import Box from "../../components/ui/Box";

const ResearshPage = () => {
  /* ────────────── STATE & STORE  ────────────── */
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const researchTypePathName = pathname.split("/")[2];
  const researchCategoryPathName = pathname.split("/")[3];
  const researchCategoryData = useAppSelector(
    (state) =>
      state?.researshSlice?.researchDic?.[researchTypePathName]
        ?.researchCategoriesData
  );

  /* ────────────── Effects  ────────────── */
  useEffect(() => {
    if (
      !findResearchCategoryByResearchCategoryNamePath(
        researchCategoryData ?? [],
        researchCategoryPathName
      )
    ) {
      navigate("/not-found");
    }
  }, [navigate, researchCategoryData, researchCategoryPathName]);

  /* ────────────── Handlers  ────────────── */

  return (
    (researchCategoryData?.length ?? 0) > 0 && (
      <Box className="grid grid-cols-[1fr,300px] gap-10">
        <Box className="">
          <DynamicResearchQuestionForm />
        </Box>
        <Box>
          <ResearchCategoryTree
            onClickNode={() => {}}
            researshStageCategoryData={researchCategoryData}
          />
        </Box>
      </Box>
    )
  );
};

export default ResearshPage;
