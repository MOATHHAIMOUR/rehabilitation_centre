import { useState } from "react";
import Box from "../../../components/ui/Box";
import SelectMenu from "../../../components/ui/SelectMenu";
import Modal from "../../../components/ui/Modal";
import NewResearchTypeForm from "./NewResearchTypeForm";
import { useGetAllResearchTypesQuery } from "../../../store/services/researchTypeSliceApi";
import SelecetResearchCategoriesTree from "./SelecetResearchCategoriesTree";

interface IPops {
  onFinishCollectingCategoryData: (
    ResearchId: number,
    ResearchCategryId: number,
    title: string
  ) => void;
  HandleResetQuestionResearchCategoryData: () => void;
}
const QuestionCategoriesManagment = ({
  onFinishCollectingCategoryData,
  HandleResetQuestionResearchCategoryData,
}: IPops) => {
  /* ────────────── STORE  ────────────── */

  const { data: ResearchsTypesResponse } = useGetAllResearchTypesQuery();
  const ResearchsTypes = ResearchsTypesResponse?.data.map((p) => ({
    label: p.researchTypeNameAr,
    value: p.researchTypeId,
  }));

  /* ────────────── STATE  ────────────── */
  const [selectedResearchTypeId, setselectedResearchTypeId] =
    useState<number>(0);

  const selectedResearchTypeInfo = ResearchsTypes?.find(
    (x) => x.value === selectedResearchTypeId
  );

  const [isNewResearchModalOpend, setNewResearchModalOpend] = useState(false);

  /* ────────────── HANDLERS  ────────────── */

  return (
    <>
      <Box className="mb-4">
        <SelectMenu
          label="أنواع البحوث"
          options={ResearchsTypes ?? []}
          isMulti={false}
          onChange={(selected) => {
            if (selected && !Array.isArray(selected)) {
              setselectedResearchTypeId(selected);
            }
          }}
          value={ResearchsTypes?.find(
            (t) => t.value === selectedResearchTypeId
          )}
        />
        <p
          onClick={() => setNewResearchModalOpend(true)}
          className="text-xs text-blue-600 mt-2 cursor-pointer"
        >
          إضافة نوع بحث جديد
        </p>
      </Box>

      {selectedResearchTypeId > 0 && (
        <SelecetResearchCategoriesTree
          key={selectedResearchTypeId}
          selectedResearchTypeTitle={selectedResearchTypeInfo?.label ?? ""}
          HandleResetQuestionResearchCategoryData={
            HandleResetQuestionResearchCategoryData
          }
          onFinishCollectingCategoryData={onFinishCollectingCategoryData}
          selectedResearchTypeId={selectedResearchTypeId!}
        />
      )}

      {/* Add New Modal For Main Category */}
      <Modal isOpen={isNewResearchModalOpend} title="إضافة نوع بحث جديد">
        <NewResearchTypeForm onCancel={() => setNewResearchModalOpend(false)} />
      </Modal>
    </>
  );
};

export default QuestionCategoriesManagment;
