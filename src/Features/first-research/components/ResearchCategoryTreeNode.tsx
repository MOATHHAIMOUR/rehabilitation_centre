import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { IResearchCategory } from "../../../store/services/researchCategoryApiSlice";

interface ITreeProps {
  onClickNode: (stageCategoryId: number) => void;
  currentResearchCategoriesIds: number[];
  node: IResearchCategory;
  level: number;
}

const ResearchCategoryTreeNode = ({
  node,
  onClickNode,
  currentResearchCategoriesIds,
  level = 0,
}: ITreeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(currentResearchCategoriesIds.includes(node.researchCategoryId));
  }, [currentResearchCategoriesIds, node.researchCategoryId]);

  const onOpenNodeHandler = (stageCategory: IResearchCategory) => {
    setIsOpen((prev) => !prev);
    if (stageCategory.childrenResearchCategories.length === 0) {
      onClickNode(stageCategory.researchCategoryId);
    }
  };

  return (
    <>
      {/* Main clickable node */}
      <div
        className={`cursor-pointer  flex justify-between items-center transition-colors rounded-md ${
          currentResearchCategoriesIds[
            currentResearchCategoriesIds.length - 1
          ] === node.researchCategoryId
            ? "bg-gray-400"
            : "bg-gray-200 hover:bg-gray-300 "
        }`}
        style={{
          padding: "10px 12px",
          paddingRight: `${level * 20 + 8}px`, // Indent based on level
          color: "black", // Black text
          fontSize: "14px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          borderLeft: level > 0 ? "2px solid #888" : "none", // Line indicator for children
        }}
        onClick={() => onOpenNodeHandler(node)}
        title={node.nameAr}
      >
        <span className="font-medium overflow-hidden text-ellipsis">
          {node.nameAr}
        </span>

        {/* Chevron icon for expandable nodes */}
        {node.childrenResearchCategories.length > 0 && (
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-black"
          >
            <FaChevronLeft />
          </motion.span>
        )}
      </div>

      {/* Child nodes with animated expand/collapse */}
      {node.childrenResearchCategories.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {node.childrenResearchCategories.map((child) => (
            <ResearchCategoryTreeNode
              onClickNode={onClickNode}
              currentResearchCategoriesIds={currentResearchCategoriesIds}
              key={child.researchCategoryId}
              node={child}
              level={level + 1}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ResearchCategoryTreeNode;
