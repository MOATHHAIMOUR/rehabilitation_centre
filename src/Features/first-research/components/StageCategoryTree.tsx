import { useState } from "react";
import { motion } from "framer-motion";
import { IStageCategory } from "../../../store/stageCategoryApiSlice";
import { FaChevronLeft } from "react-icons/fa";

const treeData: IStageCategory[] = [
  {
    stageCategoryId: 1,
    nameAr: "📂 التصنيفات",
    nameEn: "Categories",
    stageId: 1,
    childCategories: [
      {
        stageCategoryId: 2,
        nameAr: "📁 المرحلة الأولى",
        nameEn: "Stage 1",
        stageId: 1,
        childCategories: [
          {
            stageCategoryId: 3,
            nameAr: "📌 التصنيف الفرعي 1.1",
            nameEn: "Subcategory 1.1",
            stageId: 1,
            childCategories: [],
          },
          {
            stageCategoryId: 4,
            nameAr: "📌 التصنيف الفرعي 1.2",
            nameEn: "Subcategory 1.2",
            stageId: 1,
            childCategories: [],
          },
        ],
      },
      {
        stageCategoryId: 5,
        nameAr: "📁 المرحلة الثانية",
        nameEn: "Stage 2",
        stageId: 1,
        childCategories: [
          {
            stageCategoryId: 6,
            nameAr: "📌 التصنيف الفرعي 2.1",
            nameEn: "Subcategory 2.1",
            stageId: 1,
            childCategories: [],
          },
          {
            stageCategoryId: 7,
            nameAr: "📁 التصنيف الفرعي 2.2",
            nameEn: "Subcategory 2.2",
            stageId: 1,
            childCategories: [
              {
                stageCategoryId: 8,
                nameAr: "📌 تصنيف فرعي أخر",
                nameEn: "Another Subcategory",
                stageId: 1,
                childCategories: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

interface IProps {
  onClickNode: (stageCategoryId: number) => void;
}
const StageCategoryTree = ({ onClickNode }: IProps) => {
  return (
    <div className="w-[350px] mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        التصنيفات
      </h2>
      <div className="tree-container">
        {treeData.map((node) => (
          <TreeNode
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

interface ITreeProps {
  onClickNode: (stageCategoryId: number) => void;
  node: IStageCategory;
  level: number;
}
const TreeNode = ({ node, onClickNode, level = 0 }: ITreeProps) => {
  /* ────────────── STATES  ────────────── */
  const [isOpen, setIsOpen] = useState(level === 0);
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
        className="cursor-pointer p-3 flex justify-between items-center  hover:bg-gray-200 transition rounded-md"
        style={{ paddingRight: `${level * 20}px` }} // Indent child nodes
        onClick={() => onOpenNodeHandler(node)}
      >
        <span className="font-medium">{node.nameAr}</span>
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

      {/* Child Nodes (Animated Expand/Collapse) */}
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
            <TreeNode
              onClickNode={onClickNode}
              key={child.stageCategoryId}
              node={child}
              level={level + 1}
            />
          ))}
        </motion.div>
      )}
    </>
  );
};
