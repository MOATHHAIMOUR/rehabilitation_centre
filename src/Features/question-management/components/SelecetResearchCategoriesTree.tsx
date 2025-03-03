import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SearchKeyVal } from "../interfaces";
import {
  IResearchCategory,
  IResultNewResearchCategory,
} from "../../../store/services/researchCategoryApiSlice";
import SelectMenu from "../../../components/ui/SelectMenu";
import Modal from "../../../components/ui/Modal";
import NewResearchCategoryForm from "./NewResearchCategory";
import {
  addChildToParent,
  findResearchCategoryByResearchCategoryId,
} from "../utils";
import { useResearchCategories } from "../hooks/useLazyGetAllResearchCategories";

interface IProps {
  selectedResearchTypeId: number;
  selectedResearchTypeTitle: string;
  onFinishCollectingCategoryData: (
    selectedResearchTypeId: number,
    ResearchCategoryId: number,
    title: string
  ) => void;
  HandleResetQuestionResearchCategoryData: () => void;
}

const SelecetResearchCategoriesTree = ({
  selectedResearchTypeId,
  selectedResearchTypeTitle,
  HandleResetQuestionResearchCategoryData,
  onFinishCollectingCategoryData,
}: IProps) => {
  /* ────────────── STATES & STORE  ────────────── */

  const { getResearchCategories } = useResearchCategories();

  const [SelectMenusData, setSelectedMenusData] = useState<Array<SearchKeyVal>>(
    []
  );

  const [researchCategoriesTree, setResearchCategoriesTree] = useState<
    IResearchCategory[]
  >([]);

  const NewResearchCategoryData = useRef<{
    selectedParentResearchCategoryId: number | null;
    TitleToAddNew: string;
    Title: string;
  }>(null!);

  const [isNewResearchCategoryModalOpend, setNewResearchCategoryModal] =
    useState(false);
  /* ────────────── Effects  ────────────── */

  // Initial Load - Set First Level
  useEffect(() => {
    const fetchData = async () => {
      const researchCategoriesTree = await getResearchCategories(
        selectedResearchTypeId
      );
      setResearchCategoriesTree(researchCategoriesTree.data);
      setSelectedMenusData([
        {
          key: 1,
          name: `تصنيفات ${selectedResearchTypeTitle}`,
          options:
            researchCategoriesTree?.data?.map((p) => ({
              label: p.nameAr,
              value: p.researchCategoryId,
            })) || [],
          SelectedValue: null,
        },
      ]);
    };

    fetchData();
  }, [
    getResearchCategories,
    selectedResearchTypeId,
    selectedResearchTypeTitle,
  ]);

  /* ────────────── Handlers  ────────────── */
  function GetSubResearchCategoriesByResearchCategoryId(
    ResearchCategoryId: number,
    menuKey: number,
    optionName: string
  ) {
    HandleResetQuestionResearchCategoryData();
    // is selcted menu the last one
    const isSelectedMenuLastOne =
      SelectMenusData[SelectMenusData.length - 1].key === menuKey;
    if (!isSelectedMenuLastOne) {
      setSelectedMenusData((menus) => menus.filter((m) => m.key <= menuKey));
    }

    const currentSelectedMenu = findResearchCategoryByResearchCategoryId(
      researchCategoriesTree ?? [],
      ResearchCategoryId
    );

    console.log("ResearchCategoryId");
    console.log(ResearchCategoryId);

    if (currentSelectedMenu?.childrenResearchCategories?.length ?? 0 > 0) {
      // menu is already exists
      const menu = SelectMenusData.find((m) => m.key === menuKey);
      const name = menu?.options?.find(
        (x) => x.value === ResearchCategoryId
      )?.label;
      const newKey = Date.now();
      setSelectedMenusData((prev) => [
        ...prev,
        {
          key: newKey,
          name: `تصنيفات ${name}`,
          options: currentSelectedMenu?.childrenResearchCategories.map((p) => ({
            label: p.nameAr,
            value: p.researchCategoryId,
          })),
          SelectedValue: null,
        },
      ]);
      return;
    }

    const text = `الأسئلة التابعة إلى ${optionName}`;

    onFinishCollectingCategoryData(
      selectedResearchTypeId!,
      ResearchCategoryId!,
      text
    );
  }

  function HandleOpenNewResearchCategory(
    ResearchCategoryId: number | null,
    TitleToAddNew: string,
    Title: string
  ) {
    NewResearchCategoryData.current = {
      selectedParentResearchCategoryId: ResearchCategoryId,
      TitleToAddNew,
      Title,
    };
    setNewResearchCategoryModal(true);
  }

  async function onSuccsess(
    newCategoryResult: IResultNewResearchCategory,
    parentResearchCategoryId: number | null
  ) {
    // insert the new value in the tree
    const newTree = addChildToParent(
      researchCategoriesTree,
      parentResearchCategoryId,
      newCategoryResult
    );

    console.log("new Tree");
    console.log(newTree);

    // get the parentSelectedVal
    const parentSelectedVal = findResearchCategoryByResearchCategoryId(
      newTree ?? [],
      parentResearchCategoryId!
    );

    setSelectedMenusData((pre) => {
      let isUpdated: boolean = false;
      const updatedArr = pre.map((x, index) => {
        if (index === 0 && parentResearchCategoryId === null) {
          isUpdated = true;
          return {
            ...x,
            options: [
              ...(x.options ?? []),
              {
                label: newCategoryResult.nameAr,
                value: newCategoryResult.researchCategoryID,
              },
            ],
          };
        }

        const isThisSelecetNeedToUpdate =
          parentSelectedVal?.childrenResearchCategories.find((e) =>
            x.options?.map((x) => x.value)?.includes(e.researchCategoryId)
          );

        if (isThisSelecetNeedToUpdate) {
          isUpdated = true;
          return {
            ...x,
            options: [
              ...(x.options ?? []),
              {
                label: newCategoryResult.nameAr,
                value: newCategoryResult.researchCategoryID,
              },
            ],
          };
        }
        return x;
      });
      if (!isUpdated) {
        // const lastSelectMen = pre[pre.length - 1].name;
        updatedArr.push({
          key: Date.now(),
          name: `تصنيفات ${NewResearchCategoryData?.current?.Title}`,
          options: [
            {
              label: newCategoryResult.nameAr,
              value: newCategoryResult.researchCategoryID,
            },
          ],
          SelectedValue: null,
        });
      }
      return updatedArr;
    });

    setResearchCategoriesTree(newTree);
  }

  /* ────────────── Render  ────────────── */

  const renderSelectMenusTree = SelectMenusData?.map((menu, index) => {
    const SelectedVal = menu?.options?.find(
      (option) => option.value === menu.SelectedValue
    );

    const IsLast = index === SelectMenusData.length - 1;
    const prevTitle = `إضافة تصنيف جديد تابع إلى ${menu?.name}`;
    const currentTitle = `إضافة تصنيف جديد تابع إلى ${SelectedVal?.label}`;
    const Title = SelectedVal?.label;

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
          label={menu?.name ?? ""}
          options={menu?.options ?? []}
          isMulti={false}
          onChange={(selected) => {
            if (selected && !Array.isArray(selected)) {
              setSelectedMenusData((menus) =>
                menus.map((m) =>
                  m.key === menu.key ? { ...m, SelectedValue: selected } : m
                )
              );

              const optionName = menu.options?.find(
                (option) => option.value === selected
              )?.label;

              GetSubResearchCategoriesByResearchCategoryId(
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
              HandleOpenNewResearchCategory(null, prevTitle, Title ?? "");
            else {
              const prevSelectedMenuValResearchCategoryId =
                SelectMenusData[index - 1].SelectedValue;
              HandleOpenNewResearchCategory(
                prevSelectedMenuValResearchCategoryId,
                prevTitle,
                Title ?? ""
              );
            }
          }}
          className="text-xs text-blue-600 mt-2 cursor-pointer"
        >
          {prevTitle}
        </p>

        {SelectedVal?.value && IsLast && (
          <>
            <p
              onClick={() => {
                const prevSelectedMenuValResearchCategoryId =
                  SelectMenusData[index].SelectedValue;
                console.log(prevSelectedMenuValResearchCategoryId);
                HandleOpenNewResearchCategory(
                  prevSelectedMenuValResearchCategoryId!,
                  currentTitle,
                  Title ?? ""
                );
              }}
              className="text-xs text-blue-600 mt-2 cursor-pointer"
            >
              {currentTitle}
            </p>
          </>
        )}
      </motion.div>
    );
  });

  return (
    <div className="">
      {renderSelectMenusTree}
      {/*  */}
      <Modal
        isOpen={isNewResearchCategoryModalOpend}
        title={NewResearchCategoryData?.current?.TitleToAddNew}
      >
        <NewResearchCategoryForm
          onSucsessAddNew={onSuccsess}
          selectedParentResearchCategoryId={
            NewResearchCategoryData?.current?.selectedParentResearchCategoryId
          }
          selectedResearchTypeId={selectedResearchTypeId}
          onCancel={() => setNewResearchCategoryModal(false)}
        />
      </Modal>
    </div>
  );
};

export default SelecetResearchCategoriesTree;
