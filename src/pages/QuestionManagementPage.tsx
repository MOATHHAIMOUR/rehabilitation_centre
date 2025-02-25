import { useTranslation } from "react-i18next";
import Box from "../components/ui/Box";
import QuestionManagement from "../features/question-management/components/QuestionManagement";

const QuestionManagementPage = () => {
  const { t } = useTranslation();

  return (
    <Box className="px-8 py-5 flex flex-col gap-8">
      <Box className="flex items-center gap-4">
        <img className="w-20" src="/src/assets/images/exam.png" />
        <h1 className="text-4xl font-semibold">
          {t("QuestionPage.PageTitle")}
        </h1>
      </Box>

      <QuestionManagement />
    </Box>
  );
};

export default QuestionManagementPage;
