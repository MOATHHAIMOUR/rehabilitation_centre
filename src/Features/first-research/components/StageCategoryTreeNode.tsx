import { useEffect, useState } from "react";
import { IStageCategory } from "../../../store/services/stageCategoryApiSlice";
import { FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";

interface ITreeProps {
  onClickNode: (stageCategoryId: number) => void;
  node: IStageCategory;
  level: number;
  currentStageCategoriesIds: number[];
  currentStageCategoryIdQuestion: number;
}

const StageCategoryTreeNode = ({
  node,
  onClickNode,
  currentStageCategoriesIds,
  currentStageCategoryIdQuestion,
  level = 0,
}: ITreeProps) => {
  /* ────────────── STATES  ────────────── */
  const [isOpen, setIsOpen] = useState(false);

  /* ────────────── EFFECTS  ────────────── */
  useEffect(() => {
    setIsOpen(currentStageCategoriesIds.includes(node.stageCategoryId));
  }, [currentStageCategoriesIds, node.stageCategoryId]);
  /* ────────────── HANDLERS  ────────────── */
  function onOpenNodeHandler(stageCategory: IStageCategory) {
    setIsOpen((pre) => !pre);
    // must navigate to a new form fire the even other waise it's only a prent clicked
    if (stageCategory.childCategories.length === 0) {
      console.log("here");
      onClickNode(stageCategory.stageCategoryId);
    }
  }
  return (
    <>
      <div
        className={`cursor-pointer p-3 flex justify-between items-center ${
          currentStageCategoryIdQuestion === node.stageCategoryId
            ? "bg-blue-900 text-white"
            : "hover:bg-gray-200"
        }  transition rounded-md`}
        style={{ paddingRight: `${level * 20}px` }} // Indent child nodes
        onClick={() => onOpenNodeHandler(node)}
      >
        <span className="font-medium">
          {node.childCategories.length == 0
            ? `${"📌" + node.nameAr}`
            : `${"📂" + node.nameAr}`}
        </span>
        {node.childCategories.length > 0 && (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg"
          >
            <FaChevronLeft />
          </motion.span>
        )}
      </div>

      {node.childCategories.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {node.childCategories.map((child) => (
            <StageCategoryTreeNode
              onClickNode={onClickNode}
              key={child.stageCategoryId}
              currentStageCategoriesIds={currentStageCategoriesIds}
              currentStageCategoryIdQuestion={currentStageCategoryIdQuestion}
              node={child}
              level={level + 1}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default StageCategoryTreeNode;
