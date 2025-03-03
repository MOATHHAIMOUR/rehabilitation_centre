import { useLocation } from "react-router-dom";
import { IResearchCategory } from "../../../store/services/researchCategoryApiSlice";
import ResearchCategoryTreeNode from "./ResearchCategoryTreeNode";
import { useAppSelector } from "../../../store";

interface IProps {
  researshStageCategoryData: IResearchCategory[];
  onClickNode: (stageCategoryId: number) => void;
}

const ResearchCategoryTree = ({
  onClickNode,
  researshStageCategoryData,
}: IProps) => {
  const { pathname } = useLocation();
  const researchTypePathName = pathname.split("/")[2];

  const currentResearchCategoryInfo = useAppSelector((state) =>
    state.researshSlice.researchDic[
      researchTypePathName
    ].researchFormsData.find((p) => p.currentPath === pathname)
  );

  return (
    <div className="w-full bg-gray-100 border rounded-lg ">
      {/* Title */}
      <h2 className="text-lg font-bold text-center py-2 bg-gray-50 text-gray-800">
        التصنيفات
      </h2>

      {/* Tree Container */}
      <div className="p-2 space-y-1">
        {researshStageCategoryData.map((node) => (
          <ResearchCategoryTreeNode
            currentResearchCategoriesIds={
              currentResearchCategoryInfo?.researchCategoriesIdsPath ?? []
            }
            onClickNode={onClickNode}
            key={node.researchCategoryId}
            node={node}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default ResearchCategoryTree;
