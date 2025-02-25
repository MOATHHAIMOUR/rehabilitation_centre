import { IStageCategory } from "../../../store/services/stageCategoryApiSlice";
import { useAppSelector } from "../../../store";
import StageCategoryTreeNode from "./StageCategoryTreeNode";

interface IProps {
  researshStageCategoryData: IStageCategory[];
  onClickNode: (stageCategoryId: number) => void;
}
const StageCategoryTree = ({
  onClickNode,
  researshStageCategoryData,
}: IProps) => {
  const CurrentFormInfo = useAppSelector(
    (state) => state.firstResearsh.CurrentFormInfo
  );

  const currentStageCategoriesIds = CurrentFormInfo.stageCategoryIdsPath;

  const currentStageCategoryIdQuestion =
    CurrentFormInfo.stageCategoryIdsPath?.[
      CurrentFormInfo?.stageCategoryIdsPath?.length - 1
    ];

  return (
    <div className="w-[350px] mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        التصنيفات
      </h2>
      <div className="tree-container">
        {researshStageCategoryData.map((node) => (
          <StageCategoryTreeNode
            currentStageCategoriesIds={currentStageCategoriesIds}
            currentStageCategoryIdQuestion={currentStageCategoryIdQuestion}
            onClickNode={onClickNode}
            key={node.stageCategoryId}
            node={node}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default StageCategoryTree;
