import { useEffect } from "react";
import { useGetAllStagesCategoryByStageIdQuery } from "../../../store/services/stageCategoryApiSlice";
import { EnResearshType } from "../Enum";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Form } from "../../../components/components/Form";
import { setForm, setUpResearshForm } from "../store/FirstResearshSlice";
import {
  researchInfoSchema,
  researchInfoSchemaDefaultValues,
  TResearchInfoSchema,
} from "../types/researchInfoSchema";
import { SubmitHandler } from "react-hook-form";
import Box from "../../../components/ui/Box";
import StageCategoryTree from "./StageCategoryTree";
import { BuildMainDaynamicResearshValues } from "../Helpers/indes";
import DynamicFormContent from "./DynamicFormContent";

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
    if (FirstResearshStageCategoriesResponse?.data) {
      const data = BuildMainDaynamicResearshValues(
        FirstResearshStageCategoriesResponse?.data,
        "",
        [],
        [],
        FirstResearshStageCategoriesResponse?.data.length
      );
      dispatch(setUpResearshForm(data));
    }
  }, [FirstResearshStageCategoriesResponse?.data, dispatch]);

  /* ────────────── HANDLERS  ────────────── */

  const handleSubmit: SubmitHandler<TResearchInfoSchema> = (data) => {
    console.log(data);
    // if (!CurrentFormData.IsLastForm) {
    //   const nextFormData = FirstResearshFormsData[CurrentFormData.formKey + 1];
    //   dispatch(
    //     setForm({
    //       currentPath: nextFormData.path,
    //       formKey: nextFormData.key,
    //       IsFirstForm: nextFormData.IsFirstPath,
    //       IsLastForm: nextFormData.IsLastPath,
    //       NextPath: nextFormData.IsLastPath
    //         ? null
    //         : FirstResearshFormsData[nextFormData.key + 1].path,
    //       prevPath: CurrentFormData.currentPath,
    //       stageCategoryId: nextFormData.stageCategoryId,
    //     })
    //   );
    // } else {
    //   // handle submit all forms logic
    // }
  };

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

  function onSelectStageCategoryNode(stageCategoryId: number) {
    const formData = FirstResearshFormsData.find(
      (s) =>
        s.stageCategoryIdsPath[s.stageCategoryIdsPath.length - 1] ===
        stageCategoryId
    )!;

    console.log(formData);
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
        stageCategoryIdsPath: formData.stageCategoryIdsPath,
        currentStageCategoryId:
          formData.stageCategoryIdsPath[
            formData.stageCategoryIdsPath.length - 1
          ],
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
          <DynamicFormContent />
        </Form>
      </Box>
      <Box>
        <StageCategoryTree
          researshStageCategoryData={
            FirstResearshStageCategoriesResponse?.data ?? []
          }
          onClickNode={onSelectStageCategoryNode}
        />
      </Box>
    </Box>
  );
};

export default DynamicFirstResearchCategoryForm;
