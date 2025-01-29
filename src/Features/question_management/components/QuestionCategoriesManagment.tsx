import { useRef, useState } from "react";
import {
  useLazyGetAllStagesCategoryByStageIdQuery,
  useLazyGetSubStagesCategoryByStageCategoryIdQuery,
} from "../store/stageCategoryApiSlice";
import { useGetAllStagesTypesQuery } from "../store/stageSliceApi";
import { SearchKeyVal } from "../interfaces";
import Box from "../../../components/ui/Box";
import SelectMenu from "../../../components/ui/SelectMenu";
import Modal from "../../../components/ui/Modal";
import NewStageTypeForm from "./NewStageTypeForm";
import NewStageCategoryForm from "./NewStageCategoryType";
import { motion } from "framer-motion";

interface IPops {
  onFinishCollectingCategoryData: (
    StageCategryId: number,
    title: string
  ) => void;
  HandleResetQuestionStageCategoryData: () => void;
}
const QuestionCategoriesManagment = ({
  onFinishCollectingCategoryData,
  HandleResetQuestionStageCategoryData,
}: IPops) => {
  /* ────────────── STORE  ────────────── */

  const { data: stagesTypesResponse } = useGetAllStagesTypesQuery();
  const stagesTypes = stagesTypesResponse?.data.map((p) => ({
    label: p.stageNameAr,
    value: p.stageId,
  }));

  const [triggerGetCategoriesBasedOnStageId] =
    useLazyGetAllStagesCategoryByStageIdQuery();

  const [triggerGetSubStagesCategoriesByOnStageCategryId] =
    useLazyGetSubStagesCategoryByStageCategoryIdQuery();

  const NewStageCategoryData = useRef<{
    selectedStageId: number;
    selectedParentStageCategory: number | null;
    title: string;
  }>(null!);

  /* ────────────── STATE  ────────────── */
  const [selectedStageId, setStageId] = useState<number | null>(null);

  const [isNewStageModalOpend, setNewstageModalOpend] = useState(false);

  const [isNewStageCategoryModalOpend, setNewStageCategoryModal] =
    useState(false);

  const [SelectMenusData, setSelectedMenusData] = useState<Array<SearchKeyVal>>(
    []
  );
  /* ────────────── HANDLERS  ────────────── */

  async function GetCategoriesBasedOnStageIdHandler(stageId: number) {
    try {
      if (stageId === selectedStageId) return;
      const CategoriesBasedOnStageIdResponse =
        await triggerGetCategoriesBasedOnStageId(stageId).unwrap();

      const selectedStage = stagesTypes?.find(
        (s) => s.value === stageId
      )?.label;

      HandleResetQuestionStageCategoryData();
      setSelectedMenusData([
        {
          key: Date.now(),
          SelectedValue: null,
          name: `تصنيفات ${selectedStage}`,
          options: CategoriesBasedOnStageIdResponse.data.map((p) => ({
            label: p.nameAr,
            value: p.stageCategoryId,
          })),
        },
      ]);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  }

  async function GetSubStageCategoriesByStageCategoryId(
    stageCategoryId: number,
    menuKey: number,
    optionName: string
  ) {
    HandleResetQuestionStageCategoryData();
    // is selcted menu the last one
    const isSelectedMenuLastOne =
      SelectMenusData[SelectMenusData.length - 1].key === menuKey;
    if (!isSelectedMenuLastOne) {
      setSelectedMenusData((menus) => menus.filter((m) => m.key <= menuKey));
    }

    const stagesCategories =
      await triggerGetSubStagesCategoriesByOnStageCategryId(
        stageCategoryId
      ).unwrap();

    if (stagesCategories.data.length > 0) {
      // menu is already exists
      const menu = SelectMenusData.find((m) => m.key === menuKey);
      const name = menu?.options?.find(
        (x) => x.value === stageCategoryId
      )?.label;
      const newKey = Date.now();
      setSelectedMenusData((prev) => [
        ...prev,
        {
          key: newKey,
          name: `تصنيفات ${name}`,
          options: stagesCategories.data.map((x) => ({
            label: x.nameAr,
            value: x.stageCategoryId,
          })),
          SelectedValue: null,
        },
      ]);
      return;
    }

    const text = `الأسئلة التابعة إلى ${optionName}`;

    onFinishCollectingCategoryData(stageCategoryId!, text);
  }

  function HandleOpenNewStageCategory(
    selectedStageId: number,
    stageCategory: number | null,
    title: string
  ) {
    NewStageCategoryData.current = {
      selectedStageId: selectedStageId,
      selectedParentStageCategory: stageCategory,
      title,
    };
    setNewStageCategoryModal(true);
  }

  const renderSelecetMenus = SelectMenusData?.map((menu, index) => {
    const SelectedVal = menu?.options?.find(
      (option) => option.value === menu.SelectedValue
    );
    const title = ` إضافة تصنيف جديد تابع إلى ${menu.name}`;
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        key={menu.key}
        className="mb-4"
      >
        <SelectMenu
          label={menu.name ?? ""}
          options={menu.options ?? []}
          isMulti={false}
          onChange={(selected) => {
            if (selected && !Array.isArray(selected)) {
              setSelectedMenusData((menus) =>
                menus?.map((m) => {
                  return m.key === menu.key
                    ? {
                        ...m,
                        SelectedValue: selected,
                      }
                    : m;
                })
              );
              const optionName = menu?.options?.find(
                (option) => option.value === selected
              )?.label;
              GetSubStageCategoriesByStageCategoryId(
                selected,
                menu.key,
                optionName!
              );
            }
          }}
          value={SelectedVal}
        />
        <p
          onClick={() => {
            if (index === 0)
              HandleOpenNewStageCategory(selectedStageId!, null, title);
            else {
              const prevSelectedMenuValStageCategoryId =
                SelectMenusData[index - 1].SelectedValue;
              HandleOpenNewStageCategory(
                selectedStageId!,
                prevSelectedMenuValStageCategoryId,
                title
              );
            }
          }}
          className="text-xs text-blue-600 mt-2 cursor-pointer"
        >
          {title}
        </p>
      </motion.div>
    );
  });

  return (
    <>
      <Box className="mb-4">
        <SelectMenu
          label="أنواع البحوث"
          options={stagesTypes ?? []}
          isMulti={false}
          onChange={(selected) => {
            if (selected && !Array.isArray(selected)) {
              setStageId(selected);
              GetCategoriesBasedOnStageIdHandler(selected);
            }
          }}
          value={stagesTypes?.find((t) => t.value === selectedStageId)}
        />
        <p
          onClick={() => setNewstageModalOpend(true)}
          className="text-xs text-blue-600 mt-2 cursor-pointer"
        >
          إضافة نوع بحث جديد
        </p>
      </Box>

      {/* Sub Categories Builder */}
      {renderSelecetMenus}

      {/* Add New Modal For Main Category */}
      <Modal isOpen={isNewStageModalOpend} title="إضافة نوع بحث جديد">
        <NewStageTypeForm onCancel={() => setNewstageModalOpend(false)} />
      </Modal>

      {/* Add New Modal For SubCategory */}
      <Modal
        isOpen={isNewStageCategoryModalOpend}
        title={NewStageCategoryData?.current?.title}
      >
        <NewStageCategoryForm
          stagId={NewStageCategoryData?.current?.selectedStageId}
          parentStageCategoryId={
            NewStageCategoryData?.current?.selectedParentStageCategory
          }
          onCancel={() => setNewStageCategoryModal(false)}
        />
      </Modal>
    </>
  );
};

export default QuestionCategoriesManagment;
