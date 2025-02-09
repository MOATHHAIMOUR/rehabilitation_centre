import { useState } from "react";
import Box from "../../../components/ui/Box";
import QuestionCategoriesManagment from "./QuestionCategoriesManagment";
import { motion } from "framer-motion";
import Modal from "../../../components/ui/Modal";
import AddQuestionForm from "./AddQuestionForm";
import { opacityAnimationProps } from "../animation";

const QuestionManagement = () => {
  /* ────────────── STATE  ────────────── */
  const [questionStageCategoryData, setQuestionStageCategoryData] = useState<{
    StageId: number;
    QuestionStageCategoryId: number;
    QuestionTitle: string;
  } | null>(null); // Default initial value

  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  /* ────────────── HANDLERS  ────────────── */
  function onFinishCollectingCategoryData(
    StageId: number,
    stageCategoryId: number,
    title: string
  ) {
    console.log("stageCategoryId: " + stageCategoryId);
    setQuestionStageCategoryData({
      StageId: StageId,
      QuestionStageCategoryId: stageCategoryId,
      QuestionTitle: title,
    });
    // Fetch Questions
  }

  function HandleResetQuestionStageCategoryData() {
    setQuestionStageCategoryData(null);
  }
  function HandleOpenAddQuestionModal() {
    setIsAddQuestionModalOpen(true);
  }
  /* ────────────── UI  ────────────── */
  return (
    <Box>
      <QuestionCategoriesManagment
        onFinishCollectingCategoryData={onFinishCollectingCategoryData}
        HandleResetQuestionStageCategoryData={
          HandleResetQuestionStageCategoryData
        }
      />

      {questionStageCategoryData != null && (
        <motion.div {...opacityAnimationProps}>
          <p className="mt-6 text-2xl font-semibold">
            {questionStageCategoryData.QuestionTitle}
          </p>
          <p
            onClick={HandleOpenAddQuestionModal}
            className="mt-2 text-xs font-semibold text-blue-500 cursor-pointer"
          >
            أضف سؤال جديد
          </p>

          <Modal title="إضافة سؤال جديد" isOpen={isAddQuestionModalOpen}>
            <AddQuestionForm
              StageId={questionStageCategoryData.StageId}
              StageCategoryId={
                questionStageCategoryData.QuestionStageCategoryId
              }
              onCancel={() => setIsAddQuestionModalOpen(false)}
            />
          </Modal>
        </motion.div>
      )}
    </Box>
  );
};

export default QuestionManagement;
