import { useTranslation } from "react-i18next";
import Box from "../components/ui/Box";
import OpenApplicantFolder from "../Features/open_applicant_folder/components/Main/OpenApplicantFolder";

const OpenApplicantFolderPage = () => {
  const { t } = useTranslation();

  return (
    <Box className="px-8 py-5 flex flex-col gap-8">
      <Box className="flex items-center gap-4">
        <img
          className="w-20"
          src="/src/assets/images/ApplicanFolderImage.png"
        />
        <h1 className="text-4xl font-semibold">
          {t("NewApplicantForm.PageTitle")}
        </h1>
      </Box>

      <OpenApplicantFolder />
    </Box>
  );
};

export default OpenApplicantFolderPage;
